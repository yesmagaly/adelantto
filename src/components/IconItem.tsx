import Icon from "./Icon/Icon";

interface ComponentProp {
  children: any;
  icon: string;
}

const IconItem: React.FC<ComponentProp> = ({ children, icon }) => {
  return (
    <div className="px-5">
      <div className="flex gap-4">
        <div className="flex justify-center items-center basis-40 border-r-2 border-[#D8D8D8] border-solid">
          <div className="flex gap-4">
            <Icon name={icon} className="mr-12 text-3xl bg-black" />
          </div>
        </div>
        <div className="my-4 basis-full leading-3">{children}</div>
      </div>
    </div>
  );
};

export default IconItem;
