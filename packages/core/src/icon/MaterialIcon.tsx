type T_props = {
  name: string;
  className?: string;
  size?: string;
  fill?: boolean;
};

export function MaterialIcon({
  name,
  className,
  size = "24px",
  fill = false,
  ...props
}: T_props) {
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
}
