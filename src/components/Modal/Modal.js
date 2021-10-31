import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';
import PropTypes from 'prop-types';

export default function Modal({ toggleModal, children }) {
  useEffect(() => {
    const handleEscape = e => {
      if (e.code === 'Escape') {
        toggleModal();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [toggleModal]);

  const handleModalClose = e => {
    if (e.currentTarget === e.target) {
      toggleModal();
    }
  };

  return createPortal(
    <div className="Overlay" onClick={handleModalClose}>
      <div className="Modal">{children}</div>
    </div>,
    document.getElementById('modalRoot'),
  );
}

Modal.propTypes = {
  toggleModal: PropTypes.func,
  children: PropTypes.node,
};
