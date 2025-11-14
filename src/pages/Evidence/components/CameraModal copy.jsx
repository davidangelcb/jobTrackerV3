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
    if (show) startCamera();
    else stopCamera();
    return stopCamera;
  }, [show]);

  const startCamera = async () => {
    try {
      // Intentamos abrir la cámara trasera primero
      const constraints = {
        video: {
          facingMode: { ideal: "environment" }, // 🔹 usa la cámara trasera si existe
        },
        audio: false,
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error iniciando cámara:", err);

      // Si falla (por permisos o sin cámara trasera), intentamos la frontal como fallback
      try {
        const fallbackStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
        });
        setStream(fallbackStream);
        if (videoRef.current) {
          videoRef.current.srcObject = fallbackStream;
        }
      } catch (err2) {
        console.error("Error al intentar cámara frontal:", err2);
      }
    }
  };


  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
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
      const newPhotos = [...photos, blob];
      setPhotos(newPhotos);
    }, "image/jpeg");
  };

  const handleConfirm = () => {
    onCapture(photos);
    setPhotos([]);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg" className="camera-modal">
      <Modal.Body className="p-0 bg-black text-white camera-modal-body">
        <div className="camera-wrapper">
          <video
            ref={videoRef} 
            autoPlay 
            playsInline className="camera-view"
          />
          <button className="close-overlay-btn" onClick={onHide}>
            <FaTimes />
          </button>
          <button className="capture-btn" onClick={takePhoto}>
            <FaCamera />
          </button>
        </div>

        <canvas ref={canvasRef} hidden />
        <div className="thumbnails-container">
          {photos.map((p, i) => (
            <div key={i} className="thumb">
              <img
                key={i}
                src={URL.createObjectURL(p)}
                alt={`captura-${i}`}
                className="rounded-0 border-0"
                width={90}
                height={70}
              />
            </div>
          ))}
        </div>

        <div className="footer-section">
          <button
            className="send-btn rounded-0"
            disabled={photos.length === 0}
            onClick={handleConfirm}
          >
            Send
          </button>
          <p className="hint-text">
            The min. number of photos is x and the max. is x.
          </p>
        </div>
      </Modal.Body>

      
    </Modal>
  );
}
