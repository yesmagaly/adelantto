import "./styles.css";

export function Root({className = '', ...props}) {
  return <div className={`page ${className}`} {...props} />
}

export function Header({className = '', ...props}) {
  return <div className={`page-header ${className}`} {...props} />
}

export function Body({ className = '', ...props}) {
  return <div className={`page-body ${className}`} {...props} />
}

export function Footer({ className = '', ...props}) {
  return <div  className={`page-footer ${className}`} {...props} />
}

