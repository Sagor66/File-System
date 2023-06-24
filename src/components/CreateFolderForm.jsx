import { useEffect, useState } from "react";

import Swal from "sweetalert2";
import {} from "react-icons/ai";
import { Link } from "react-router-dom";
import FormInputs from "./FormInputs";
import FileSystem from "./FileSystem";

const CreateFolderForm = () => {
  const [folderName, setFolderName] = useState("");
  const [folders, setFolders] = useState([]);
  const [updatedData, setUpdatedData] = useState([]);
  const [newFile, setNewFile] = useState([]);

  const handleCreateFolder = () => {
    event.preventDefault();
    const folderNameInput = event.target.folderName.value;
    setFolderName(folderNameInput);
    const newFolder = { name: folderNameInput };
    fetch("http://localhost:5000/folders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newFolder),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setFolders([...folders, newFolder]);
          console.log(data);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Folder Created",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      });
  };

  console.log(folders);

  const handleDeleteFolder = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/folders/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              const updatedFolders = folders.filter(
                (folder) => folder._id !== id
              );
              console.log(updatedFolders);
              setFolders(updatedFolders);
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          });
      }
    });
  };

  useEffect(() => {
    fetch("http://localhost:5000/folders")
      .then((res) => res.json())
      .then((data) => {
        setFolders(data);
      });
  }, []);

  //   console.log(folders)

  return (
    <div>
      <FormInputs handleCreateFolder={handleCreateFolder}></FormInputs>
      <div className="grid grid-cols-6 gap-10 items-center justify-center mt-20">
        {folders.map((folder, i) => (
          <FileSystem
            key={i}
            folder={folder}
            handleDeleteFolder={handleDeleteFolder}
          ></FileSystem>
        ))}
      </div>
    </div>
  );
};

export default CreateFolderForm;
