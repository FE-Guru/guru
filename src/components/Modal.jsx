import React from "react";
import style from "../css/Modal.module.css";

const Modal = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={style.modalOverlay}>
      <div className={style.modalContent}>
        <button className={style.closeBtn} onClick={onClose}>
          &times;
        </button>
        {children}
        <button
          className={`btn primary yellow ${style.modalBtn}`}
          onClick={onClose}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default Modal;
