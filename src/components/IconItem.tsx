import Icon from "./Icon/Icon";

interface ComponentProp {
  children: any;
  icon: string;
}

const IconItem: React.FC<ComponentProp> = ({ children, icon }) => {
  return (
    <div className="px-5">
      <div className="flex gap-4">
        <div className="flex justify-center items-center border-[#D8D8D8] border-r-2 border-solid basis-40">
          <div className="flex gap-4">
            <Icon name={icon} className="bg-black mr-12 text-3xl" />
          </div>
        </div>
        <div className="my-4 leading-3 basis-full">{children}</div>
      </div>
    </div>
  );
};

export default IconItem;
