import React, { useState } from "react";
import ImagePreviewModal from "../../../components/ImagePreviewModal";

const PhotoSection = ({ title, photos }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);

  // Normalizamos los datos: puede ser string u objeto
  const formattedPhotos = photos.map((photo) =>
    typeof photo === "string"
      ? { url: photo, description: "", date: "" }
      : {
          url: photo.url || "",
          description: photo.description || "",
          date: photo.date || "",
        }
  );

  const handleOpenPreview = (index) => {
    setPreviewIndex(index);
    setShowPreview(true);
  };

  return (
    <div className="photo-section pt-2 mb-3">
      <h6 className="section-title mb-2">{title}</h6>

      {/* Scroll horizontal */}
      <div className="photo-scroll d-flex overflow-auto pb-2 gap-1">
        {formattedPhotos.map((photo, index) => (
          <div
            key={index}
            className="photo-card me-2 position-relative"
            style={{ flex: "0 0 auto" }}
            onClick={() => handleOpenPreview(index)}
          >
            <img
              src={photo.url}
              alt={`photo-${index}`}
              className="rounded-0"
              style={{
                width: "120px",
                height: "120px",
                objectFit: "cover",
                cursor: "pointer",
              }}
            />
            {photo.date && (
              <div
                className="date-label position-absolute bottom-0 start-0 end-0 text-center text-white py-1"
                style={{ fontSize: "0.75rem" }}
              >
                {photo.date}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal de preview */}
      <ImagePreviewModal
        show={showPreview}
        photos={formattedPhotos}
        currentIndex={previewIndex}
        onClose={() => setShowPreview(false)}
        onChangeIndex={(idx) => setPreviewIndex(idx)}
        sectionTitle={title}
        showDates={true}
      />
    </div>
  );
};

export default PhotoSection;
