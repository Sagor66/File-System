import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import FormInputs from "../components/FormInputs";
import FileSystem from "../components/FileSystem";
import { useLoaderData, useParams } from "react-router-dom";

const Nested = () => {
  const [folderName, setFolderName] = useState("");
  const [folders, setFolders] = useState([]);
  const [updatedData, setUpdatedData] = useState([]);

  const nestedFolder = useLoaderData()
  const { id } = useParams()

//   console.log(nestedFolder)

  const handleCreateFolder = () => {
    event.preventDefault();
    const folderNameInput = event.target.folderName.value;
    setFolderName(folderNameInput);
    const newFolder = { name: folderNameInput };
    fetch(`http://localhost:5000/folders/${id}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newFolder),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setFolders([...folders, data]);
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
        fetch(`http://localhost:5000/folders/child/${id}`, {
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
    fetch(`http://localhost:5000/folders/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFolders(data);
      });
  }, [id]);

  return (
    <div className="max-w-7xl mx-auto">
      <FormInputs handleCreateFolder={handleCreateFolder}></FormInputs>
      <h1>Hello</h1>
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

export default Nested;
