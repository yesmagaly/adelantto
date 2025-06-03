type T_props = {
  name: string;
  className?: string;
  size: string;
};

export function MaterialIcon({ name, className, size, ...props }: T_props) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{ fontSize: size }}
      {...props}
    >
      {name}
    </span>
  );
}
