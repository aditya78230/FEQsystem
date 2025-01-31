const { Router } = require("express");
const { FAQ } = require("../db");
const router = Router();

router.post('/answer',async (req, res) => {
    const question = req.body.question;
    const answer = req.body.answer;

    await FAQ.updateMany({question},{answer})
    res.json({message: "FAQ answered successfully"});
    
});

router.delete('/delete', async (req, res) => {
    const id = req.query.id;
    await FAQ.deleteOne({
        _id:id
    })
    res.json({message: "FAQ deleted successfully"});
});


module.exports = router