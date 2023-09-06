import "./styles.css";

interface IconProps {
  name: string;
  className: string;
}

const Icon: React.FC<IconProps> = (props) => {
  return <i className={`icon icon-${props.name} ${props.className}`}></i>;
};

export default Icon;
