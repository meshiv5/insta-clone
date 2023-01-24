import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Box, Flex, Image, Text, Button, useToast } from "@chakra-ui/react";
import { userContext } from "../context/UserContextProider";
import PostGrid from "../components/Posts/PostGrid";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import getUserDetails from "../utils/getUserDetailsFromCookie";
import followAUser from "../utils/followAUser";
import unfollowAUser from "../utils/unfollowAUser";
import ShowRootFollowers from "../components/Profile/ShowRootFollowers";
import ShowRootFollowing from "../components/Profile/ShowRootFollowing";
import ShowOtherFollowers from "../components/Profile/ShowOtherFollowers";
import ShowOtherFollowing from "../components/Profile/ShowOtherFollowing";
export default function Profile() {
  const { profileData, setUpdateIt } = useContext(userContext);
  const toast = useToast();
  const [iFollow, setIFollow] = useState(false);
  const [heFollow, setHeFollow] = useState(false);
  const [rootFollowersListOpen, setRootFollowersListOpen] = useState(false);
  const [rootFollowingListOpen, setRootFollowingListOpen] = useState(false);
  const [otherFollowersListOpen, setOtherFollowersListOpen] = useState(false);
  const [otherFollowingListOpen, setOtherFollowingListOpen] = useState(false);

  const [currUserData, setCurrUserData] = useState({});
  const navigate = useNavigate();
  const { username } = useParams();
  useEffect(() => {
    getUserDetails(username)
      .then((res) => {
        let data = res.data.data;
        setCurrUserData({ ...data });
      })
      .catch((err) => {
        navigate("/404");
      });
    if (username !== profileData.username) {
      console.log(currUserData);
      if (profileData.following?.includes(currUserData._id)) {
        setIFollow(true);
      }
      if (profileData.followers?.includes(currUserData._id)) {
        setHeFollow(true);
      }
    }
  }, [profileData]);

  // Show Root Followers Modal
  function showRootFollowers() {
    if (rootFollowersListOpen) {
      setRootFollowersListOpen(false);
    } else setRootFollowersListOpen(true);
  }
  // Show Root Following Modal
  function showRootFollowing() {
    if (rootFollowingListOpen) {
      setRootFollowingListOpen(false);
    } else setRootFollowingListOpen(true);
  }
  if (username === profileData.username)
    return (
      <>
        <Navbar />
        {rootFollowersListOpen && <ShowRootFollowers followers={profileData.followers} showRootFollowers={showRootFollowers} />}
        {rootFollowingListOpen && <ShowRootFollowing following={profileData.following} showRootFollowing={showRootFollowing} />}
        <Flex pl={["10%", "28%"]} mt={"50px"}>
          <Image mr={"10%"} className="rounded-full" src={profileData.profileImage} w={[50, 100, 150]} h={[50, 100, 150]} />
          <Box>
            <Flex mb={"20px"} alignItems={"center"} justifyContent={"space-between"} w={"200px"}>
              <Text fontWeight={"500"} fontSize={"18px"} letterSpacing={"0.5px"}>
                {profileData.username}
              </Text>
              <Button cursor={"pointer"} border={"none"} fontSize={"14px"} h={"35px"}>
                <Link to={"/edit/user"} className="no-underline">
                  Edit Profile
                </Link>
              </Button>
            </Flex>
            <Flex mb={"20px"} justifyContent={"space-between"} w={"250px"} ml={["-30%", "0%", "0%"]} mt={["12%", "0%", "0%"]}>
              <Text>
                <Text as={"span"} fontWeight={"500"} mr={"3px"}>
                  {profileData?.posts?.length ?? 0}
                </Text>
                post
              </Text>
              <Text
                onClick={() => {
                  showRootFollowers(profileData._id);
                }}
                className="cursor-pointer"
              >
                <Text as={"span"} fontWeight={"500"} mr={"3px"}>
                  {profileData?.followers?.length ?? 0}
                </Text>
                followers
              </Text>
              <Text
                onClick={() => {
                  showRootFollowing(profileData._id);
                }}
                className="cursor-pointer"
              >
                <Text as={"span"} fontWeight={"500"} mr={"3px"}>
                  {profileData?.following?.length ?? 0}
                </Text>
                following
              </Text>
            </Flex>
            <Box ml={["-30%", "0%", "0%"]}>
              <Text fontWeight={"500"} fontSize={"14px"}>
                {profileData.name}
              </Text>
              <Text>{profileData.bio ?? "Visionary."}</Text>
            </Box>
          </Box>
        </Flex>
        <hr
          style={{
            width: "60%",
            margin: "auto",
            marginTop: "120px",
            marginBottom: "100px",
            border: "none",
            borderTop: "1px solid #8e8e8e",
            opacity: "0.4",
          }}
        />
        <PostGrid userId={profileData._id} />
      </>
    );
  else {
    function handleFollow() {
      if (iFollow) {
        unfollowAUser(currUserData._id).then((s) => {
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
    // Show Other Followers Modal
    function showOtherFollowers() {
      if (otherFollowersListOpen) {
        setOtherFollowersListOpen(false);
      } else setOtherFollowersListOpen(true);
    }
    // Show Other Following Modal
    function showOtherFollowing() {
      if (otherFollowingListOpen) {
        setOtherFollowingListOpen(false);
      } else setOtherFollowingListOpen(true);
    }
    return (
      <>
        <Navbar />
        {otherFollowersListOpen && <ShowOtherFollowers followers={currUserData.followers} showOtherFollowers={showOtherFollowers} />}
        {otherFollowingListOpen && <ShowOtherFollowing following={currUserData.following} showOtherFollowing={showOtherFollowing} />}
        <Flex pl={["10%", "28%"]} mt={"50px"}>
          <Image mr={"10%"} className="rounded-full" src={currUserData.profileImage} w={[50, 100, 150]} h={[50, 100, 150]} />
          <Box>
            <Flex mb={"20px"} alignItems={"center"} justifyContent={"space-between"} w={"230px"}>
              <Text fontWeight={"500"} fontSize={"18px"} letterSpacing={"0.5px"} mr={"5px"}>
                {currUserData.username}
              </Text>

              {iFollow && heFollow ? (
                <Button onClick={handleFollow} cursor={"pointer"} border={"none"} fontSize={"14px"} h={"35px"}>
                  Following
                </Button>
              ) : heFollow && !iFollow ? (
                <Button onClick={handleFollow} cursor={"pointer"} color={"#fff"} background={"#0095F6"} border={"none"} fontSize={"14px"} h={"35px"}>
                  Follow Back
                </Button>
              ) : !heFollow && iFollow ? (
                <Button onClick={handleFollow} cursor={"pointer"} border={"none"} fontSize={"14px"} h={"35px"}>
                  Following
                </Button>
              ) : (
                <Button onClick={handleFollow} cursor={"pointer"} border={"none"} color={"#fff"} background={"#0095F6"} fontSize={"14px"} h={"35px"}>
                  Follow
                </Button>
              )}
            </Flex>
            <Flex mb={"20px"} justifyContent={"space-between"} w={"250px"} ml={["-30%", "0%", "0%"]} mt={["12%", "0%", "0%"]}>
              <Text>
                <Text as={"span"} fontWeight={"500"} mr={"3px"}>
                  {currUserData?.posts?.length ?? 0}
                </Text>
                post
              </Text>
              <Text onClick={showOtherFollowers} className="cursor-pointer">
                <Text as={"span"} fontWeight={"500"} mr={"3px"}>
                  {currUserData?.followers?.length ?? 0}
                </Text>
                followers
              </Text>
              <Text onClick={showOtherFollowing} className="cursor-pointer">
                <Text as={"span"} fontWeight={"500"} mr={"3px"}>
                  {currUserData?.following?.length ?? 0}
                </Text>
                following
              </Text>
            </Flex>
            <Box ml={["-30%", "0%", "0%"]}>
              <Text fontWeight={"500"} fontSize={"14px"}>
                {currUserData.name}
              </Text>
              <Text>{currUserData.bio ?? "Visionary."}</Text>
            </Box>
          </Box>
        </Flex>
        <hr
          style={{
            width: "60%",
            margin: "auto",
            marginTop: "120px",
            marginBottom: "100px",
            border: "none",
            borderTop: "1px solid #8e8e8e",
            opacity: "0.4",
          }}
        />
        <PostGrid userId={currUserData._id} />
      </>
    );
  }
}
