import React from "react";
import "./styles.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal__content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Modal;
