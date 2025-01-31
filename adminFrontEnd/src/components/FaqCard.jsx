import React from "react";

const FaqCard = ({ faq, onDelete }) => {
  return (
    <div style={{ border: "1px solid #ddd", padding: "10px", margin: "10px" }}>
      <h3>{faq.question}</h3>
      <div dangerouslySetInnerHTML={{ __html: faq.answerHtml }} />
      <button onClick={() => onDelete(faq.id)} style={{ marginLeft: "10px" }}>
        Delete
      </button>
    </div>
  );
};

export default FaqCard;
