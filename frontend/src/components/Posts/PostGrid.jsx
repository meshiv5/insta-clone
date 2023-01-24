import { Box, Image, SimpleGrid } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../context/UserContextProider";
import getPostData from "../../utils/getPostDataFromCookie.js";
export default function PostGrid({ userId }) {
  const { postData } = useContext(userContext);
  const { profileData } = useContext(userContext);
  const [otherPostData, setPostData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (profileData._id !== userId)
      getPostData(userId).then((res) => {
        let data = res.data.posts;
        setPostData([...data]);
      });
  }, [userId]);
  if (profileData._id === userId)
    return (
      <SimpleGrid overflow={"hidden"} w={["80%", "60%", "60%"]} className="" columns={[1, 1, 2, 3]} spacing={10} m={"auto"}>
        {postData.map((post) => {
          return (
            <Box
              onClick={() => {
                navigate(`/post/${post._id}`);
              }}
              className="cursor-pointer max-sm:w-[100%]"
              key={post._id}
            >
              <Image src={post.image} w={"350px"} h={"350px"} />
            </Box>
          );
        })}
      </SimpleGrid>
    );
  else
    return (
      <SimpleGrid overflow={"hidden"} w={["80%", "60%", "60%"]} className="" columns={[1, 1, 2, 3]} spacing={10} m={"auto"}>
        {otherPostData.map((post) => {
          return (
            <Box
              onClick={() => {
                navigate(`/post/${post._id}`);
              }}
              className="cursor-pointer max-sm:w-[100%]"
              key={post._id}
            >
              <Image src={post.image} w={"350px"} h={"350px"} />
            </Box>
          );
        })}
      </SimpleGrid>
    );
}
