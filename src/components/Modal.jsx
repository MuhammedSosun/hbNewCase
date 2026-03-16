import React from "react";
import "../css/modal.css";
function Modal({ isOpen, title, description, onCancel, onConfirm }) {
  if (!isOpen) return null;
  return (
    <div
      className="modal-overlay"
      onClick={onCancel}
      data-testid="modal-overlay"
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">{title}</h3>

        {description && <p className="modal-description">{description}</p>}

        <div className="modal-actions">
          <button className="btn-confirm" onClick={onConfirm}>
            EVET
          </button>
          <button className="btn-cancel" onClick={onCancel}>
            HAYIR
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
