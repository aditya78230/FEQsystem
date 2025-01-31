const { Router } = require("express");
const { FAQ } = require("../db");
const Redis = require("ioredis");
const tr = require("googletrans").default;

const router = Router();
const redisClient = new Redis({
  host: "127.0.0.1",
  port: process.env.REDIS_PORT || 6379,
});

const extractTextFromHTML = (html) => {
  return html.replace(/<[^>]+>/g, "").trim();
};

const replaceTextInHTML = (html, originalText, translatedText) => {
  const escapedOriginal = originalText.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  const regex = new RegExp(escapedOriginal, "gi");
  return html.replace(regex, translatedText);
};

router.get("/faqs", async (req, res) => {
  const lang = req.query.lang || "en";
  const cacheKey = `faqs_${lang}`;

  try {
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log("Cache hit!");
      return res.json(JSON.parse(cachedData)); //return cached data
    }

    console.log("Cache miss!");

    const data = await FAQ.find({});
    const translatedData = await Promise.all( // translate each FAQ
      data.map(async (item) => {
        const originalAnswerText = extractTextFromHTML(item.answerHtml);
        const translatedQuestion = (await tr(item.question, { to: lang })).text;
        const translatedAnswer = (await tr(originalAnswerText, { to: lang })).text;
        const translatedAnswerHtml = replaceTextInHTML(item.answerHtml, originalAnswerText, translatedAnswer); 

        return {
          id: item._id,
          question: translatedQuestion,
          answer: translatedAnswer,
          answerHtml: translatedAnswerHtml,
        };
      })
    );

    await redisClient.setex(cacheKey, 3600, JSON.stringify(translatedData));

    res.json(translatedData);
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.post('/faq', async (req, res) => { //add new faq
  const { question, answer, answerHtml } = req.body;
  await FAQ.create({ question, answer, answerHtml });
  res.json({ message: "FAQ created successfully" });
});


module.exports = router;
