import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import CameraModal from "./CameraModal";
import { addPhoto, getPhotosBySection, deletePhoto } from "../../../services/db";
import ImagePreviewModal from "../../../components/ImagePreviewModal";
import './PhotoSectionContent.css';

export default function PhotoSectionContent({
  sectionKey,
  onStatusChange,
  min = { before: 0, after: 0 },
  max = { before: 5, after: 5 }
}) {
  const [showCamera, setShowCamera] = useState(false);
  const [tab, setTab] = useState("before");
  const [photos, setPhotos] = useState({ before: [], after: [] });
  const [preview, setPreview] = useState({ show: false, currentIndex: 0 });

  // UTIL

  const checkCompletion = (before, after) => {
    const done = before.length >= min.before && after.length >= min.after;
    onStatusChange(done);
  };

  const loadPhotos = async () => {
    const before = await getPhotosBySection(sectionKey, "before");
    const after = await getPhotosBySection(sectionKey, "after");
    setPhotos({ before, after });
    checkCompletion(before, after);
  };

  const handleCapture = async (newBlobs) => {
    for (const blob of newBlobs) {
      await addPhoto(sectionKey, blob, tab);
    }
    await loadPhotos();
  };

  const handleDelete = async (id) => {
    await deletePhoto(id);
    await loadPhotos();
  };

  // Abre visor fotos
  const openPreview = (index) => setPreview({ show: true, currentIndex: index });
  const closePreview = () => setPreview({ show: false, currentIndex: 0 });

  // Convertir fotos del tab a formato que espera ImagePreviewModal
  const previewPhotos = photos[tab].map((p) => ({
    url: URL.createObjectURL(p.blob),
    description: p.description || "",
    date: p.date || "",
  }));

  useEffect(() => {
    loadPhotos();
  }, [sectionKey]);

  // SUBCOMPONENTES INTERNOS

  const TabSelector = () => (
    <div className="d-flex mb-2 border-bottom tabs">
      {["before", "after"].map((t) => (
        <div
          key={t}
          onClick={() => setTab(t)}
          className={`text-center flex-fill py-2 fw-semibold ${tab === t ? "active" : ""}`}
          style={{ cursor: "pointer" }}
        >
          {t === "before" ? "Before" : "After"}
        </div>
      ))}
    </div>
  );

  const CameraButton = () => {
    const atMax = photos[tab].length >= max[tab];
    const color = atMax ? "#C7C7CC" : "#0088FF";
    const opacity = atMax ? 0.5 : 1;

    return (
      <div
        className="d-flex flex-column align-items-center justify-content-center border-1 rounded-0 camera-card flex-shrink-0"
        style={{
          width: 70,
          height: 120,
          cursor: atMax ? "not-allowed" : "pointer",
          backgroundColor: atMax ? "#F5F5F5" : "#EDF7FF",
          border: `1px solid ${color}`,
          paddingTop: "6px"
        }}
        onClick={() => !atMax && setShowCamera(true)}
      >
        <i className="bi bi-camera fs-1" style={{ color, opacity }} />
        <small style={{ marginTop: "4px", fontSize: "0.75rem", color, opacity }}>Min {min[tab]}</small>
        <small style={{ fontSize: "0.75rem", color, opacity }}>Max {max[tab]}</small>
      </div>
    );
  };

  const PhotoList = () => (
    <div className="d-flex gap-2 overflow-auto flex-grow-1 pb-2" style={{ scrollSnapType: "x mandatory" }}>
      {photos[tab].map((p, idx) => {
        const url = URL.createObjectURL(p.blob);
        return (
          <div key={p.id} className="position-relative">
            <img
              src={url}
              alt="photo"
              className="thumb-img"
              onClick={() => openPreview(idx)}
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
      })}
    </div>
  );

  return (
    <div className="photo-section">
      <TabSelector />

      <div className="d-flex align-items-start gap-2 py-2">
        <CameraButton />
        <PhotoList />
      </div>

      <CameraModal
        show={showCamera}
        onHide={() => setShowCamera(false)}
        onCapture={handleCapture}
        maxPhotos={photos[tab].length < max[tab] ? max[tab] - photos[tab].length : 0}
      />

      <ImagePreviewModal
        show={preview.show}
        photos={previewPhotos} // Array con URLs
        currentIndex={preview.currentIndex} // Foto específica
        onClose={() => closePreview(false)}
        onChangeIndex={(idx) => setPreview({ ...preview, currentIndex: idx })}
        sectionTitle={null}
        showDates={false}
        showDescription={false} 
      />
    </div>
  );
}
