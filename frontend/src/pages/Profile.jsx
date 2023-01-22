import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Box, Heading, Flex, Image, Text, IconButton, Button, Highlight } from "@chakra-ui/react";
import { userContext } from "../context/UserContextProider";
import PostGrid from "../components/Posts/PostGrid";
import { Link } from "react-router-dom";
export default function Profile() {
  const { profileData } = useContext(userContext);
  return (
    <>
      <Navbar />
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
            <Text>
              <Text as={"span"} fontWeight={"500"} mr={"3px"}>
                {profileData?.followers?.length ?? 0}
              </Text>
              followers
            </Text>
            <Text>
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
      <PostGrid />
    </>
  );
}
