import { NavLink } from "react-router-dom";
import { MaterialIcon } from "../icon";
import { cn } from "../../../../src/components/utils";
import React, { HTMLAttributeAnchorTarget } from "react";

export function NavRoot(props: {
  className?: string;
  children: React.ReactNode;
  [key: string]: any;
}) {
  return <ul className="flex justify-center gap-2 p-4" {...props} />;
}

export function NavItem({
  icon,
  to,
  children,
  target,
}: {
  icon?: string;
  to: string;
  children: React.ReactNode;
  target?: HTMLAttributeAnchorTarget
}) {
  return (
    <li className="w-1/4">
      <NavLink
        to={to}
        target={target}
        className={(isActive) => {
          return cn(
            "flex flex-col justify-center items-center gap-1 py-2 h-full",
            isActive ? "text-purple-500" : "text-gray-600"
          );
        }}
      >
        {icon && <MaterialIcon name={icon} fill />}
        <div className="text-xs">{children}</div>
      </NavLink>
    </li>
  );
}

export { NavRoot as Root, NavItem as Item };
