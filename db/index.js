const mongoose = require('mongoose');



mongoose.connect('mongodb+srv://visitor:78230aditya@testingadi.6y5d5.mongodb.net/FAQ', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

  const FAQSchema = new mongoose.Schema({
    id: { type: String},
    question: { type: String, required: true },
    answer: { type: String}, //  plain text 
    answerHtml: { type: String} //  WYSIWYG supported data
  });
  



const FAQ = mongoose.model('FAQ', FAQSchema);


module.exports = { FAQ };