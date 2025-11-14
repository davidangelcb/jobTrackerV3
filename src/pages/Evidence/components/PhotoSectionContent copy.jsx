import React, { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import CameraModal from "./CameraModal";
import { Modal } from "react-bootstrap";
import { addPhoto, getPhotosBySection, deletePhoto } from "../../../services/db";
import './PhotoSectionContent.css';
// import "./UnderlineTabs.css";

export default function PhotoSectionContent({
  sectionKey,
  onStatusChange,
  required = { before: 0, after: 0 },
  min = { before: 0, after: 0 },
  max = { before: 5, after: 5 }
}) {
  const [showCamera, setShowCamera] = useState(false);
  const [tab, setTab] = useState("before");
  const [photos, setPhotos] = useState({ before: [], after: [] });
  const [preview, setPreview] = useState({ show: false, current: null });

  const checkCompletion = (before, after) => {
    const done =
      before.length >= (min.before || 0) &&
      after.length >= (min.after || 0);
    onStatusChange(done);
  };


  // Cargar fotos al montar
  useEffect(() => {
    const loadPhotos = async () => {
      const before = await getPhotosBySection(sectionKey, "before");
      const after = await getPhotosBySection(sectionKey, "after");
      setPhotos({ before, after });
      checkCompletion(before, after);
    };
    loadPhotos();
  }, [sectionKey]);

  const handleCapture = async (newBlobs) => {
    for (const blob of newBlobs) {
      await addPhoto(sectionKey, blob, tab);
    }
    const before = await getPhotosBySection(sectionKey, "before");
    const after = await getPhotosBySection(sectionKey, "after");
    setPhotos({ before, after });
    checkCompletion(before, after);
  };

  const handleDelete = async (id) => {
    await deletePhoto(id);
    const before = await getPhotosBySection(sectionKey, "before");
    const after = await getPhotosBySection(sectionKey, "after");
    setPhotos({ before, after });
    checkCompletion(before, after);
  };

  const openPreview = (img) => setPreview({ show: true, current: img });
  const closePreview = () => setPreview({ show: false, current: null });

  const renderPhoto = (p) => {
    const url = URL.createObjectURL(p.blob);
    return (
      <div key={p.id} className="position-relative">
        <img
          src={url}
          alt="photo"
          width={120}
          height={120}
          className="rounded-0 border-0 thumb-img"
          onClick={() => openPreview(url)}
          style={{ cursor: "pointer" }}
        />

        <Button
          variant="dark"
          size="sm"
          className="position-absolute top-0 end-0 mt-1 me-1 rounded-circle d-flex align-items-center justify-content-center border-0"
          style={{ width: '18px', height: '18px', padding: '11px' }}
          onClick={() => handleDelete(p.id)}
        >
          <i className="bi bi-x-lg text-white"></i>
        </Button>
        
      </div>
    );
  };

  return (
    <div className="photo-section">
      <div className="d-flex mb-2 border-bottom tabs">
        {["before", "after"].map((t) => (
          <div
            key={t}
            onClick={() => setTab(t)}
            className={`text-center flex-fill py-2 fw-semibold ${
              tab === t ? "active" : ""
            }`}
            style={{ cursor: "pointer" }}
          >
            {t === "before" ? "Before" : "After"}
          </div>
        ))}
      </div>

      <div className="d-flex align-items-start gap-2 py-2">
        <div
          className="d-flex flex-column align-items-center justify-content-center border-1 rounded-0 camera-card flex-shrink-0"
          style={{
            width: 70,
            height: 120,
            cursor: photos[tab].length < max[tab] ? "pointer" : "not-allowed",
            backgroundColor: photos[tab].length < max[tab] ? "#EDF7FF" : "#F5F5F5",
            border: photos[tab].length < max[tab] ? "1px solid #0088FF" : "1px solid #C7C7CC",
          }}
          onClick={() => photos[tab].length < max[tab] && setShowCamera(true)}
        >
          <i className="bi bi-camera fs-1"
          style={{ 
            opacity: photos[tab].length < max[tab] ? 1 : .8,
            color: photos[tab].length < max[tab] ? "#0088FF" : "#C7C7CC",
          }}
           />
          
           {/* Texto min */}
            <small
              style={{
                marginTop: "4px",
                fontSize: "0.75rem",
                opacity: photos[tab].length < max[tab] ? 1 : .5,
                color: photos[tab].length < max[tab] ? "#0088FF" : "#C7C7CC",
              }}
            >
              Min {min[tab]}
            </small>

            {/* Texto max */}
            <small
              style={{
                fontSize: "0.75rem",
                opacity: photos[tab].length < max[tab] ? 1 : .5,
                color: photos[tab].length < max[tab] ? "#0088FF" : "#C7C7CC",
              }}
            >
              Max {max[tab]}
            </small>
            
        </div>

        <div
          className="d-flex gap-2 overflow-auto flex-grow-1 pb-2"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {photos[tab].map((p) => renderPhoto(p))}
        </div>
      </div>

      <CameraModal
        show={showCamera}
        onHide={() => setShowCamera(false)}
        onCapture={handleCapture}
        maxPhotos={photos[tab].length < max[tab] ? max[tab] - photos[tab].length : 0}
      />

      {/* Modal de preview */}
      <Modal show={preview.show} onHide={closePreview} centered>
        <Modal.Body className="text-center p-0">
          {preview.current && (
            <img src={preview.current} alt="preview" className="w-100 rounded" />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
