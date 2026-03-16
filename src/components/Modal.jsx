import React from "react";
import "../css/modal.css";
function Modal({ showModal, onCancel, onConfirm }) {
  if (!showModal) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 className="modal-title">Ürünü silmek istediğinize emin misiniz?</h3>

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
