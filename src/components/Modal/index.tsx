import React from "react";
import "./modal.scss";

interface ModalProps {
  open?: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open = false, children }) => {
  if (!open) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      {children}
    </div>
  );
};

export default Modal;
