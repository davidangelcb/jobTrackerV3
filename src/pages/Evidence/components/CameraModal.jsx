import React, { useRef, useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaCamera, FaTimes } from "react-icons/fa";
import "./CameraModal.css";

export default function CameraModal({ show, onHide, onCapture, maxPhotos = 5 }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    if (show) {
      startCamera();
    } else {
      stopCamera();
      setPhotos([]);
    }

    return stopCamera;
  }, [show]);

  const startCamera = async () => {
    try {
      const constraints = { video: { facingMode: { ideal: "environment" } }, audio: false };
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      if (videoRef.current) videoRef.current.srcObject = mediaStream;
    } catch (err) {
      console.error("Error iniciando cámara:", err);
      try {
        const fallbackStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
        setStream(fallbackStream);
        if (videoRef.current) videoRef.current.srcObject = fallbackStream;
      } catch (err2) {
        console.error("Error cámara frontal fallback:", err2);
      }
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const takePhoto = () => {
    if (!videoRef.current || photos.length >= maxPhotos) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    ctx.drawImage(videoRef.current, 0, 0);

    canvas.toBlob((blob) => {
      setPhotos(prev => [...prev, { blob, selected: true }]); // ⚡ cada foto inicia como seleccionada
    }, "image/jpeg");
  };

  const toggleSelectPhoto = (index) => {
    setPhotos(prev =>
      prev.map((p, i) => i === index ? { ...p, selected: !p.selected } : p)
    );
  };

  const handleConfirm = () => {
    const selectedPhotos = photos.filter(p => p.selected).map(p => p.blob);
    onCapture(selectedPhotos);
    setPhotos([]);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg" className="camera-modal">
      <Modal.Body className="p-0 bg-black text-white camera-modal-body">
        <div className="camera-wrapper">
          <video ref={videoRef} autoPlay playsInline className="camera-view" />
          <button className="close-overlay-btn" onClick={onHide}><FaTimes /></button>
          <button className="capture-btn" onClick={takePhoto}><FaCamera /></button>
        </div>

        <canvas ref={canvasRef} hidden />

        <div className="thumbnails-container">
          {photos.map((p, i) => (
            <div
              key={i}
              className={`thumb ${p.selected ? "selected" : ""}`}
              onClick={() => toggleSelectPhoto(i)}
            >
              <img
                src={URL.createObjectURL(p.blob)}
                alt={`captura-${i}`}
                className="rounded-0 border-0"
                width={90}
                height={70}
              />
              {p.selected && <div className="overlay-checkmark">✓</div>}
            </div>
          ))}
        </div>

        <div className="footer-section">
          <button
            className="send-btn rounded-0"
            disabled={
              photos.filter(p => p.selected).length === 0 ||
              photos.filter(p => p.selected).length > maxPhotos
            }
            onClick={handleConfirm}
          >
            Send ({photos.filter(p => p.selected).length} / {maxPhotos})
          </button>

          <p className="hint-text">
            The max number of photos is {maxPhotos}.
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
}
