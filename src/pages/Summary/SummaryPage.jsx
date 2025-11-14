import React from "react";
import PhotoSection from "./components/PhotoSection";
import InfoBox from "./components/InfoBox";
import PdfButton from "./components/PdfButton";
import "./SummaryPage.css";

export default function SummaryPage() {

  const beforePhotos = [
    { url: "/images/foto1.jpg", date: "Thursday, 8th, 2025" },
    { url: "/images/foto2.jpg", date: "Friday, 9th, 2025" },
    { url: "/images/foto3.jpg", date: "Saturday, 10th, 2025" },
  ];

  const afterPhotos = [
    { url: "/images/foto1.jpg", date: "Sunday, 11th, 2025" },
    { url: "/images/foto2.jpg", date: "Monday, 12th, 2025" },
    { url: "/images/foto3.jpg", date: "Tuesday, 13th, 2025" },
  ];

  return (
    <div className="p-3 pt-4">
      <h1 className="fw-700 mb-2">Job Completed On</h1>

      <div className="date-rage mb-3">
        <p className="mb-1"><strong>Start:</strong> Thu 10/23/25 @12:43 EST</p>
        <p className="mb-1"><strong>Stop:</strong> Thu 10/23/25 @19:43 EST</p>
        <p className="mb-0">Turn Cleaner</p>
      </div>

      <hr />

      <div className="mb-3">
        <PdfButton text="PDF Summary" />
      </div>

      <PhotoSection title="Before Photos" photos={beforePhotos} />
      <PhotoSection title="After Photos" photos={afterPhotos} />
            
      <InfoBox />
    </div>
  );
}
