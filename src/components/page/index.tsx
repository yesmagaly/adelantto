import React from "react";
import "./styles.css";

interface ComponentProps {
  variant: string;
  className: string;
  children: React.ReactNode;
}

export function Root({ className = "", variant = "", ...props }) {
  return <div className={`page is-${variant} ${className}`} {...props} />;
}

export function Header({ className = "", ...props }) {
  return <div className={`page-header ${className}`} {...props} />;
}

export function Body({ className = "", ...props }) {
  return <div className={`page-body ${className}`} {...props} />;
}

export function Footer({ className = "", ...props }) {
  return <div className={`page-footer ${className}`} {...props} />;
}
