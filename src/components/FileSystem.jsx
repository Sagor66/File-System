import { Link } from "react-router-dom";
import { AiFillFolder, AiOutlineClose } from "react-icons/ai";
import { GrUpdate } from 'react-icons/gr';

const FileSystem = ({ folder, handleDeleteFolder }) => {

    
  return (
    <div className="relative bg-slate-100 p-4 rounded-lg flex justify-center">
      <Link
        to={`/folders/${folder._id}`}
        className="flex flex-col items-center text-xl"
      >
        <AiFillFolder
          style={{ color: "#fbbf24", fontSize: "24px" }}
        ></AiFillFolder>
        {folder.name}
      </Link>
      <button
        onClick={() => handleDeleteFolder(folder._id)}
        className="text-red-500 text-xs absolute top-2 right-2"
      >
        <AiOutlineClose></AiOutlineClose>
      </button>
      {/* <button
              onClick={() => handleDeleteFolder(folder._id)}
              className="text-green-500 text-xs absolute top-6 right-2"
            >
              <GrUpdate></GrUpdate>
            </button> */}
    </div>
  );
};

export default FileSystem;
