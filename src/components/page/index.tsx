import React from "react";
import { clsx } from "clsx";
import "./styles.css";

interface T_props {
  className?: string;
  children?: React.ReactNode;
}

export const Root: React.FC<
  T_props & { as?: keyof JSX.IntrinsicElements; variant?: string }
> = ({ as, className, variant, ...props }) => {
  const Tag = as || "div";

  return (
    <Tag
      className={clsx(variant && `is-${variant}`, className)}
      {...props}
    />
  );
};

export const Header: React.FC<T_props> = ({ className, ...props }) => {
  return <div className={clsx(className)} {...props} />;
};

export const Body: React.FC<T_props> = ({ className, ...props }) => {
  return <div className={clsx(className)} {...props} />;
};

export const Footer: React.FC<T_props> = ({ className, ...props }) => {
  return <div className={clsx(className)} {...props} />;
};
