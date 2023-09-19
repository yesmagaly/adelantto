import Icon from "../components/Icon/Icon";

interface ComponentProp {
  icon: string;
  children: any;
}

const UploadDocuments: React.FC<ComponentProp> = ({ children, icon }) => {
  return (
    <div className="px-5">
      <div className="flex gap-4">
        <div className="flex justify-center items-center basis-32 border-b border-r-2 border-[#D8D8D8] border-solid">
          <div className="flex items-center gap-5">
            <input type="checkbox" id="upload" />
            <button>
              <Icon name={icon} className="bg-gray-300" />
            </button>
          </div>
        </div>
        <div className="my-4 basis-full leading-3">{children}</div>
      </div>
    </div>
  );
};

export default UploadDocuments;
