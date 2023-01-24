import { Button, Flex, Image, Text, useToast } from "@chakra-ui/react";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../context/UserContextProider";
import followAUser from "../../utils/followAUser";
import getUserDetailsUsingId from "../../utils/getUserDetailsUsingId";
import unfollowAUser from "../../utils/unfollowAUser";

export default function SingleFollowerBlock({ userId }) {
  const [currUserData, setCurrUserData] = useState({});
  const navigate = useNavigate();
  const [iFollow, setIFollow] = useState(false);
  const [heFollow, setHeFollow] = useState(false);
  const [itsMe, setItsMe] = useState(false);
  const { profileData, setUpdateIt } = useContext(userContext);
  const toast = useToast();
  useEffect(() => {
    getUserDetailsUsingId(userId)
      .then((res) => {
        let data = res.data.data;
        setCurrUserData({ ...data });
      })
      .catch((err) => {
        navigate("/404");
      });
    if (userId !== profileData._id) {
      if (profileData.following?.includes(userId)) {
        setIFollow(true);
      }
      if (profileData.followers?.includes(userId)) {
        setHeFollow(true);
      }
    } else setItsMe(true);
  }, [profileData]);
  function handleFollow() {
    if (iFollow) {
      unfollowAUser(currUserData._id).then((res) => {
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
      followAUser(currUserData._id).then((res) => {
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
    <Flex mb={"20px"} alignItems={"center"} w={"100%"} ml={"20%"} paddingBottom={"10px"} position={"relative"}>
      <Link to={`/${currUserData.username}`}>
        <Image w={35} h={35} className="rounded-full" src={currUserData.profileImage} alt="" marginRight={"8px"} />
      </Link>
      <Link to={`/${currUserData.username}`}>
        <Text fontWeight={"500"} fontSize={"18px"} letterSpacing={"0.5px"} mr={"5px"}>
          {currUserData.username}
        </Text>
      </Link>

      {iFollow && heFollow ? (
        <Button position={"absolute"} right={40} onClick={handleFollow} cursor={"pointer"} border={"none"} fontSize={"14px"} h={"35px"}>
          Following
        </Button>
      ) : heFollow && !iFollow ? (
        <Button
          position={"absolute"}
          right={40}
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
      ) : !heFollow && iFollow ? (
        <Button position={"absolute"} right={40} onClick={handleFollow} cursor={"pointer"} border={"none"} fontSize={"14px"} h={"35px"}>
          Following
        </Button>
      ) : itsMe ? (
        <Button position={"absolute"} right={40} cursor={"pointer"} border={"none"} color={"black"} fontSize={"14px"} h={"35px"}>
          <Link to={`/${profileData.username}`}>Edit User</Link>
        </Button>
      ) : (
        <Button
          position={"absolute"}
          right={40}
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
    </Flex>
  );
}
