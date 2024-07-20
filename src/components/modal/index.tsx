import ReactPortal from "../ReactPortal";
import "./styles.css";

type T_props = {
  isOpen?: boolean,
  variant?: 'compact' | 'fully';
  children?: React.ReactNode
}

export function Root({ isOpen = false, variant = 'compact', ...props }: T_props) {
  if (!isOpen) return null;

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <div className={`modal is-${variant}`}>
        <div className="modal-content">
          {props?.children}
        </div>
      </div>
    </ReactPortal>
  );
}

export function Header({ className = '', ...props }) {
  return <div className={`modal-header ${className}`} {...props} />
}

export function Body({ className = '', ...props }) {
  return <div className={`modal-body ${className}`} {...props} />
}

export function Footer({ className = '', ...props }) {
  return <div className={`modal-footer ${className}`} {...props} />
}

export default Root;
