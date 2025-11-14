import { Modal, Carousel } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import './ImagePreviewModal.css';

const ImagePreviewModal = ({
  show,
  photos = [],
  currentIndex = 0,
  onClose,
  onChangeIndex,
  sectionTitle,
  showDates = false,
  showDescription = true,
}) => {
  const currentPhoto = photos[currentIndex] || {};

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      size="lg"
      className="image-preview-modal"
      backdropClassName="custom-backdrop"
    >
      <Modal.Body className="p-0 position-relative">

        {/* Fotos con barrido */}
        <div className="image-container">
          {photos.length > 0 && (
            <Carousel
              activeIndex={currentIndex}
              onSelect={(selectedIndex) => onChangeIndex(selectedIndex)}
              interval={null}
              indicators={false}
              controls={true}
              nextLabel=""
              prevLabel=""
              touch={true}
            >
              {photos.map((p, idx) => (
                <Carousel.Item key={idx}>
                  { /* prop desde el parent */ }
                  {showDates && p.date && (
                    <div className="date text-center text-white py-2 fw-500">
                      {p.date}
                    </div>
                  )}

                  <img
                    src={p.url}
                    alt={`preview-${idx}`}
                    className="img-fluid"
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          )}

          <button className="close-overlay-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        {/* Sección de descripción opcional */}
        {showDescription && (
          <div className="image-description">
            <span className="image-title fs-6 fw-100">{sectionTitle || 'Image Title'}</span>
            <p className="image-text mt-2 rounded-0">
              {currentPhoto.description || 'This is a sample description.'}
            </p>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ImagePreviewModal;
