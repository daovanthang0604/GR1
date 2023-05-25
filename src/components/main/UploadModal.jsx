import React, { useCallback, useState } from "react";
import { XIcon, UploadIcon, TrashIcon } from "@heroicons/react/outline";
import { closeModal } from "../../features/modal/modalSlice";
import { useDispatch } from "react-redux";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import {toast} from "react-hot-toast"
import { updateFiles } from "../../features/file/filesSlice";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
const UploadModal = () => {
  const dispatch = useDispatch();
  const {currentUser} = useSelector(store=> store.user)
  const {project} = useSelector((store)=> store.projectDetail)
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    setUploadedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const handleRemove = (id)=>{
    const newAcceptedFiles = uploadedFiles.filter(file=> file.lastModified !== id);
    setUploadedFiles(newAcceptedFiles)
  }
  const handleSubmit = ()=>{
    const formData = new FormData();

    uploadedFiles.forEach((file) => {
      formData.append("files", file);
    });
    formData.append('userId', currentUser._id)
    formData.append('projectId',project._id)
    axios
      .post("http://localhost:8800/api/upload", formData,  { withCredentials: true })
      .then((response) => {
        // File(s) uploaded successfully
        console.log("File(s) uploaded successfully.");
        // Reset uploadedFiles state
        setUploadedFiles([]);
        // Close the modal
        dispatch(updateFiles(Math.floor(Math.random() * 100)));
        dispatch(closeModal({ modalId: "uploadFiles" }));
        toast.success("Upload succesfully!");
      })
      .catch((error) => {
        // Handle error scenario
        console.log("Error uploading files:", error);
      });
  };
  console.log(uploadedFiles)
  return (
    <div className="fixed top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] z-30 bg-white lg:w-2/5 w-96 rounded-xl">
      <div className="flex flex-col pt-4 pb-8 px-8 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium">Upload File</span>
          <XIcon
            className="w-6 h-6 cursor-pointer text-gray-400"
            onClick={() => dispatch(closeModal({ modalId: "uploadFiles" }))}
          />
        </div>
        <div
          {...getRootProps()}
          className="w-full h-56 flex flex-col justify-center items-center border-2 border-dashed rounded-xl bg-[#F1F7FE]"
        >
          <input {...getInputProps()} />
          <UploadIcon className="w-6 h-6 mb-2" />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>
              Drop your file here, or{" "}
              <span className="text-ocean underline">Browse</span>{" "}
            </p>
          )}
        </div>
            <div className=""> 
                {/* Print files here */}
                {uploadedFiles.map((file, index) =>{
                  const {lastModified} = file;
                  return (
                    <div key={index} className="flex items-center mt-2">
                      <span className="text-sm font-medium">{file.name}</span>
                      <span className="text-xs text-gray-500 ml-2">
                        {file.size} bytes
                      </span>
                      {console.log(lastModified)}
                      <TrashIcon className="w-4 h-4 ml-auto" onClick={()=>handleRemove(lastModified)}/>
                    </div>
                  )
                })}
            </div>
            <div className="flex justify-center pt-8">
              <button className="py-3 px-8 text-white bg-ocean rounded-xl cursor-pointer" type="submit" onClick={handleSubmit}>Upload</button>
            </div>
      </div>
    </div>
  );
};

export default UploadModal;
