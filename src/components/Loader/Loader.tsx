import ReactPortal from "../ReactPortal"
import "./loaderStyles.css";

interface ComponentProp {
  children: string | JSX.Element | JSX.Element[];
  isOpen: boolean;
}

const Loader: React.FC<ComponentProp> = ({ children, isOpen }) => {
  if (!isOpen) return null;

  return (
    <ReactPortal wrapperId="react-portal-loader-container">
      <div className="loader">
        <div className="loader-content">{children}</div>
      </div>
    </ReactPortal>
  );
};

export default Loader;
