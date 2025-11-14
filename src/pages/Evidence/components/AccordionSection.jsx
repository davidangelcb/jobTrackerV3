import React, { useState } from "react";
import { Accordion } from "react-bootstrap";
import PhotoSectionContent from "./PhotoSectionContent";
import './AccordionSection.css';

export default function AccordionSection() {
  const [status, setStatus] = useState({
    location: false,
    job: false,
  });

  const handleStatusChange = (section, isComplete) => {
    setStatus((prev) => ({ ...prev, [section]: isComplete }));
  };

  const sections = [
    { 
      key: "section-1", 
      title: "Front Door (Unit Number)", 
      min: { before: 2, after: 1 }, 
      max: { before: 3, after: 3 } 
    },
    { 
      key: "section-2", 
      title: "Kitchen - Appliances (Door Open)", 
      min: { before: 1, after: 1 }, 
      max: { before: 3, after: 3 } 
    },
    { key: "section-3", title: "Living Room", min: { before: 1, after: 1 }, max: { before: 1, after: 1 } },
    { key: "section-4", title: "Bedrooms", min: { before: 1, after: 1 }, max: { before: 2, after: 2 } },
    { key: "section-5", title: "Bathrooms", min: { before: 1, after: 1 }, max: { before: 2, after: 2 } },
    { key: "section-6", title: "Others (Not Required)", min: { before: 0, after: 0 }, max: { before: 1, after: 1 } },
  ];


  return (
    <Accordion defaultActiveKey="0" alwaysOpen={false}>
      {sections.map((s, i) => (
        <Accordion.Item eventKey={i.toString()} key={s.key}>
          <Accordion.Header>
            <div className="d-flex align-items-center justify-content-between w-100">
              <span>{s.title}</span>
              <i
                className={`bi ${
                  status[s.key]
                    ? "bi-check-circle text-silver"
                    : "bi-exclamation-circle text-warning"
                } me-2`}
              />
            </div>
          </Accordion.Header>

          <Accordion.Body>
            <PhotoSectionContent
              sectionKey={s.key}
              onStatusChange={(done) => handleStatusChange(s.key, done)}
              required={s.required}
              min={s.min}
              max={s.max}
            />

          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}
