import { NavLink } from "react-router-dom";
import { MaterialIcon } from "../icon";
import { cn } from "../../../../src/components/utils";
import React from "react";

export function NavRoot(props) {
  return <ul className="gap-2 grid grid-cols-4 p-4" {...props} />;
}

export function NavItem({
  icon,
  href,
  children,
}: {
  icon?: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <NavLink
        to={href}
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
