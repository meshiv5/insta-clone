import { useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../context/UserContextProider";
import FileUpload from "../Posts/FileUpload";

export default function EditUser({ profileData }) {
  const [formData, setFormData] = useState({ name: profileData.name, username: profileData.username, bio: profileData.bio });
  const { setUpdateIt } = useContext(userContext);
  const navigate = useNavigate();
  const toast = useToast();
  function handleFormChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  async function handleDataChange() {
    await axios.patch(process.env.REACT_APP_SERVER + "user/edit/details", formData, { withCredentials: true });
    setUpdateIt((old) => old + 10);
    toast({
      title: "Details Changed Successfully !",
      description: "your profile details has been updated !",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    navigate(`/${profileData.username}`);
  }
  return (
    <div className="p-4 col-span-2">
      <div className="flex items-center mb-6">
        <img className="w-10 h-10 mr-11 rounded-full" src={profileData.profileImage} alt="sd" />
        <div>
          <p className="font-normal -mb-1">{profileData.username}</p>
          <FileUpload></FileUpload>
        </div>
      </div>
      <div className="flex mb-6">
        <span className="font-medium mr-11">Name </span>
        <input
          value={formData.name}
          onChange={handleFormChange}
          type="text"
          name="name"
          className="border bg-white border-gray-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-72 p-1.5 "
          placeholder="Name"
          required
        />
      </div>
      <div className="flex mb-6">
        <span className="font-medium mr-4">Username</span>
        <input
          value={formData.username}
          onChange={handleFormChange}
          type="text"
          name="username"
          className="border bg-white border-gray-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-72 p-1.5 "
          placeholder="Username"
          required
        />
      </div>
      <div className="flex mb-6">
        <span className="font-medium mr-4">Bio</span>
        <textarea
          value={formData.bio}
          onChange={handleFormChange}
          type="text"
          name="bio"
          className="border ml-12 bg-white border-gray-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-72 p-1.5 "
          placeholder="Bio"
          required
        />
      </div>
      <button onClick={handleDataChange} className="border bg-[#0095F6] text-white font-semibold py-1 px-5 rounded-md ml-20">
        Submit
      </button>
    </div>
  );
}
