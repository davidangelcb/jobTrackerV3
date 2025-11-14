import React from "react";

const PdfButton = ({ text }) => {
  return (
    <a href="#" className="pdf-btn d-inline-flex justify-content-center align-items-center w-100 rounded-0">
      <i className="bi bi-download me-2"></i> {text}
    </a>
  );
};

export default PdfButton;
