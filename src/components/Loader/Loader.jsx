import ReactPortal from "../ReactPortal";
import "./loaderStyles.css";

function Loader({ children, isOpen }) {
  if (!isOpen) return null;

  return (
    <ReactPortal wrapperId="react-portal-loader-container">
      <div className="loader">
        <div className="loader-content">{children}</div>
      </div>
    </ReactPortal>
  );
}

export default Loader;
