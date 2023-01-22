import React, { useState, useContext, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { userContext } from "../../context/UserContextProider";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../redux/actions/authActions";

export default function ChangePassword({ profileData }) {
  const [formData, setFormData] = useState({ oldPassword: "", password: "" });
  const toast = useToast();
  const navigate = useNavigate();
  const { isAuth } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const { setUpdateIt } = useContext(userContext);
  function handleFormChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth]);
  function handleLogout(e) {
    e.preventDefault();
    axios
      .get(process.env.REACT_APP_SERVER + "user/logout", { withCredentials: true })
      .then((res) => {
        dispatch(setAuth(false));
        toast({
          title: "Logout Success !",
          description: "Redirecting to login !",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      })
      .catch((e) => {
        toast({
          title: "Something Went Wrong !",
          description: e.response,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  }

  async function handleDataChange(e) {
    try {
      await axios.patch(process.env.REACT_APP_SERVER + "user/change/password", formData, { withCredentials: true });
      toast({
        title: "Details Changed Successfully !",
        description: "your profile details has been updated !",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      return handleLogout(e);
    } catch (e) {
      toast({
        title: "Your Old Password is Wrong !",
        description: "try resetting your password from login page !",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      setFormData({ oldPassword: "", password: "" });
    }
  }
  return (
    <div className="p-4">
      <div className="flex items-center pb-10">
        <img src={profileData.profileImage} alt="profile" className="w-10 h-10 mr-6 rounded-full" />
        <p>{profileData.username}</p>
      </div>
      <div className="flex items-center pb-5 w-max">
        <label htmlFor="pass" className="mr-8 font-semibold">
          Old Password
        </label>
        <input
          onChange={handleFormChange}
          value={formData.oldPassword}
          type="password"
          name="oldPassword"
          className="border border-black-500 w-[140px]"
        />
      </div>
      <div className="flex items-center w-[100%] md:w-[40rem]  mb-5">
        <label htmlFor="pass" className="mr-6 font-semibold">
          New Password
        </label>
        <input onChange={handleFormChange} value={formData.password} type="password" name="password" className="border border-black-500 w-[140px]" />
      </div>
      <div className="">
        <button onClick={handleDataChange} className="w-40 border bg-[#4CB4F8] text-white py-1 px-4 rounded-md font-semibold text-sm">
          Change Password
        </button>
      </div>
    </div>
  );
}
