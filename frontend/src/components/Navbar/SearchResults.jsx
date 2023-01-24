import { Image, useToast } from "@chakra-ui/react";
import React from "react";
import { useRef } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../context/UserContextProider";
import getRandomNewUsers from "../../utils/getRandomNewUsers";
export default function SearchResults({ setOpenSearchRes, query }) {
  const toast = useToast();
  const { profileData } = useContext(userContext);
  const [searchResult, setSearchResult] = useState([]);
  let lastCall = useRef(null);
  const modalRef = useRef(null);
  useEffect(() => {
    clearTimeout(lastCall.current);
    lastCall.current = setTimeout(() => {
      getRandomNewUsers(query)
        .then((res) => {
          setSearchResult([...res.data.data]);
        })
        .catch((err) => {
          toast({
            title: "Some Error Occured !",
            description: "Api Response Error Occured .",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        });
    }, 500);

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpenSearchRes(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [query, modalRef]);
  return (
    <div ref={modalRef} className="absolute mt-[40px] w-[90%] ml-[10px] rounded-md max-h-[200px] overflow-scroll bg-white p-4">
      {searchResult.map((userData) => {
        if (userData._id === profileData._id) return;
        return (
          <div key={userData._id} className="flex align-middle w-max ml-[30px] mb-[8px]">
            <Link to={`/${userData.username}`}>
              <img className="w-[35px] h-[35px] rounded-full mr-[30px]" src={userData.profileImage} alt="" />
            </Link>
            <Link to={`/${userData.username}`}>
              <p className="font-semibold">{userData.username}</p>
              <p className="text-gray-400 text-sm">{userData.name}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
