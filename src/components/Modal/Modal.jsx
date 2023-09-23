import ReactPortal from "../ReactPortal";
import "./modalStyles.css";

function Modal({ isOpen, ...props }) {
  if (!isOpen) return null;

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <div className="modal">
        <div className="modal-content">
          {props?.children}
        </div>
      </div>
    </ReactPortal>
  );
}

export default Modal;
