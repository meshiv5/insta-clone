import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Post from "../components/Posts/Post";
import Suggestions from "../components/Home/Suggestions";
import getPostsForHomeFeed from "../utils/getPostsForHomeFeed.js";
import { useToast } from "@chakra-ui/react";
export default function Home() {
  const [posts, setPosts] = useState([]);
  const [reRenderPost, setReRenderPost] = useState(0);
  const toast = useToast();
  useEffect(() => {
    getPostsForHomeFeed()
      .then((res) => {
        let data = res.data.posts;
        setPosts([...data]);
      })
      .catch((err) => {
        toast({
          title: "Some Error Occured",
          description: "error occured in api request",
          status: "error",
          isClosable: true,
          duration: 2000,
        });
      });
  }, [reRenderPost]);
  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-2 max-md:grid-cols-1 max-md:w-[80%] max-sm:w-[100%] w-[50%] m-auto">
        <div>
          {posts.map((a) => {
            return <Post key={a._id} postData={a} setReRenderPost={setReRenderPost} firstLikeID={a.like[0]}></Post>;
          })}
        </div>

        <Suggestions></Suggestions>
      </div>
    </div>
  );
}
