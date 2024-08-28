import { cn } from "../utils";
import "./styles.css";

interface T_props {
  name: string;
  className?: string;
}

export const Icon: React.FC<T_props> = ({ className, ...props }) => {
  return (
    <i
      className={cn(`icon`, props.name && `icon-${props.name}`, className)}
    ></i>
  );
};

export default Icon;
