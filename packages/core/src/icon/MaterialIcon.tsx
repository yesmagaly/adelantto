import { memo } from "react";

type T_props = {
  name: string;
  className?: string;
  size?: string;
  fill?: boolean;
};

export const MaterialIcon = memo(({
  name,
  className,
  size = "24px",
  fill = false,
  ...props
}: T_props) => {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{
        fontSize: size,
        fontVariationSettings: `'FILL' ${fill ? 1 : 0}`,
      }}
      {...props}
    >
      {name}
    </span>
  );
});
