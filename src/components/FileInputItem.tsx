import uploadIcon from "../assets/icons/upload.svg";

interface ComponentProp {
  children: any;
}

const UploadDocuments: React.FC<ComponentProp> = ({ children }) => {
  return (
    <div className="px-5">
      <div className="flex gap-4">
        <div className="flex justify-center items-center basis-28 border-b border-r border-gray-500 border-solid">
          <div className="flex gap-5">
            <input type="checkbox" id="upload" />
            <img src={uploadIcon} />
          </div>
        </div>
        <div className="my-4">{children}</div>
      </div>
    </div>
  );
};

export default UploadDocuments;
