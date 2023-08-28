import { useEffect } from "react";
import ReactPortal from "../ReactPortal";
import "./modalStyles.css";

function Modal({ children, isOpen, handleClose }) {
  if (!isOpen) return null;

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <div className="modal">
        <div className="modal-content">
          {children}

          <button onClick={handleClose} className="button-primary mt-4">
            Aceptar
          </button>
        </div>
      </div>
    </ReactPortal>
  );
}

export default Modal;
