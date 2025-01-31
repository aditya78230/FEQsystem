import React, { useState } from "react";
import axios from "axios";
import FaqCard from "./components/FaqCard";

const API_BASE_URL = "http://localhost:3000"; 

const App = () => {
  const [faqs, setFaqs] = useState([]);
  const languages = [
    { name: "english", code: "en" },
    { name: "hindi", code: "hi" },
    { name: "marathi", code: "mr" },
    { name: "french", code: "fr" },
    { name: "spanish", code: "es" },
    { name: "japanese", code: "ja" },
    { name: "korean", code: "ko" },
    { name: "portuguese", code: "pt" },
    { name: "italian", code: "it" },
    { name: "bengali", code: "bn" },
    { name: "tamil", code: "ta" }
  ];

  const [selectedLanguage, setSelectedLanguage] = useState("");
  

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value); 
  };
  
  const fetchFaqs = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/faqs/?lang=${selectedLanguage}`);
      console.log('fetched');
      
      setFaqs(response.data); // Assuming response is an array of FAQs
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    }
  };

  const deleteFaq = async (faqId) => {
     try {
       await axios.delete(`${API_BASE_URL}/admin/delete/?id=${faqId}`);
       setFaqs(faqs.filter((faq) => faq.id !== faqId));
     } catch (error) {
       console.error("Error deleting FAQ:", error);
     }
  };

  

  return (
    <div>
      <h1>Admin FAQ Portal</h1>
      <div>
        <h3>Select Language:</h3>
        {languages.map((lang) => (
          <label key={lang.code} style={{ display: "block", margin: "5px 0" }}>
            <input
              type="radio"
              name="language"
              value={lang.code}
              checked={selectedLanguage === lang.code}
              onChange={handleLanguageChange}
            />
            {lang.name} ({lang.code})
          </label>
        ))}
      </div>

      <h4>Selected Language: {selectedLanguage ? selectedLanguage : "None"}</h4>
      <button onClick={fetchFaqs}>Get FAQs</button>
      {faqs.length === 0 ? (
        <p>No FAQs available</p>
      ) : (
        faqs.map((faq) => (
          <FaqCard key={faq.id} faq={faq} onDelete={deleteFaq} />
        ))
        
      )}
      {console.log(faqs)}
      
    </div>
  );
};

export default App;
