import { Button, useToast } from "@chakra-ui/react";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../context/UserContextProider";
import followAUser from "../../utils/followAUser";
import unfollowAUser from "../../utils/unfollowAUser";

export default function SingleSuggestion({ userData }) {
  const [iFollow, setIFollow] = useState(false);
  const [heFollow, setHeFollow] = useState(false);
  const { profileData, setUpdateIt } = useContext(userContext);
  const toast = useToast();
  useEffect(() => {
    if (profileData.following?.includes(userData._id)) {
      setIFollow(true);
    }
    if (profileData.followers?.includes(userData._id)) {
      setHeFollow(true);
    }
  }, [profileData]);
  function handleFollow() {
    if (iFollow) {
      unfollowAUser(userData._id).then((res) => {
        setUpdateIt((old) => old + 1);
        setIFollow(false);
      });

      toast({
        title: "Unfollowed Successfully !",
        description: "You Have Unfollowed This User Successfully.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    } else {
      followAUser(userData._id).then((res) => {
        setUpdateIt((old) => old + 1);
        setIFollow(true);
      });
      toast({
        title: "Followed Successfully !",
        description: "You Have Followed This User Successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  }
  return (
    <div className="flex items-center relative w-72 mb-[10px]">
      <Link to={`/${userData.username}`}>
        <img className="rounded-full w-12 h-12 cursor-pointer" src={userData.profileImage} alt="" />
      </Link>

      <div className="ml-[15px]">
        <Link to={`/${userData.username}`}>
          <p className="font-semibold text-sm relative bottom-[6px] cursor-pointer">{userData.username}</p>
        </Link>
      </div>

      {heFollow && !iFollow ? (
        <Button
          position={"absolute"}
          right={0}
          onClick={handleFollow}
          cursor={"pointer"}
          color={"#fff"}
          background={"#0095F6"}
          border={"none"}
          fontSize={"14px"}
          h={"35px"}
        >
          Follow Back
        </Button>
      ) : (
        <Button
          position={"absolute"}
          right={0}
          onClick={handleFollow}
          cursor={"pointer"}
          border={"none"}
          color={"#fff"}
          background={"#0095F6"}
          fontSize={"14px"}
          h={"35px"}
        >
          Follow
        </Button>
      )}
    </div>
  );
}
