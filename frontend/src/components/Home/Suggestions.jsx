import { useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userContext } from "../../context/UserContextProider";
import { setAuth } from "../../redux/actions/authActions";
import getRandomNewUsers from "../../utils/getRandomNewUsers";
import SingleSuggestion from "./SingleSuggestion";

export default function Suggestions() {
  const { profileData } = useContext(userContext);
  const [randomNewusers, setRandomNewUser] = useState([]);
  const dispatch = useDispatch();
  const toast = useToast();
  useEffect(() => {
    getRandomNewUsers().then((res) => {
      setRandomNewUser([...res.data.data]);
    });
  }, []);

  function handleLogout(e) {
    e.preventDefault();
    axios
      .get(process.env.REACT_APP_SERVER + "user/logout", {
        headers: {
          access_token: JSON.parse(localStorage.getItem("token")),
        },
        withCredentials: true,
      })
      .then((res) => {
        dispatch(setAuth(false));
        localStorage.removeItem("token");
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
          description: e.response.data.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  }
  return (
    <div className="pl-[80px] max-md:hidden pt-10">
      <div className="flex items-center relative w-72">
        <img className="rounded-full w-14 h-14 cursor-pointer" src={profileData.profileImage} alt="" />
        <div className="ml-[30px]">
          <p className="font-semibold text-sm cursor-pointer">{profileData.username}</p>
          <p className="text-[#8E8E8E] text-sm">{profileData.name}</p>
        </div>
        <p onClick={handleLogout} className="text-[#0095F6] font-semibold text-xs absolute right-0 cursor-pointer">
          Logout
        </p>
      </div>
      <p className="text-[#8E8E8E] text-sm font-medium mt-[15px] mb-[20px]">Suggestions for you</p>
      {randomNewusers.map((user) => {
        if (user.username !== profileData.username && !profileData.following?.includes(user._id))
          if (user.username) return <SingleSuggestion userData={user} key={user._id} />;
      })}
    </div>
  );
}
