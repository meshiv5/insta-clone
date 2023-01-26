import { useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../context/UserContextProider";

export default function FileUpload() {
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const { setUpdateIt } = useContext(userContext);
  const toast = useToast();
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(URL.createObjectURL(event.target.files[0]));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    let isImage = selectedFile.type.includes("image");
    if (!isImage) {
      toast({
        title: "Wrong File !",
        description: "select correct image file",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    } else {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("key", "7ed53e11b847a47400a93ac60441490b");
      try {
        const response = await axios.post("https://api.imgbb.com/1/upload", formData);
        let newUrl = response.data.data.display_url;
        const newData = {
          profileImage: newUrl,
        };
        await axios.patch(process.env.REACT_APP_SERVER + "user/edit/profileImage", newData, {
          headers: {
            access_token: JSON.parse(localStorage.getItem("token")),
          },
          withCredentials: true,
        });
        setUpdateIt((old) => old + 2);
        toast({
          title: "Profile Changed Successfully !",
          description: "your profile picture has been updated !",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } catch (error) {
        console.error(error);
      }
      setShowModal(false);
    }
  };

  return (
    <div>
      <button onClick={() => setShowModal(true)} className="font-semibold text-[#0095F6] text-sm">
        Change profile photo
      </button>
      {showModal && (
        <div className="fixed bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <form onSubmit={handleUpload}>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Upload Image</h3>
                    {previewUrl && <img src={previewUrl} alt="preview" style={{ maxWidth: "300px", maxHeight: "200px" }} />}
                    <div className="mt-2">
                      <input
                        className="bg-gray-200 border border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                  <button
                    type="submit"
                    className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-800"
                  >
                    Upload
                  </button>
                </span>
                <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
                  >
                    Cancel
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
