import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Post from "../components/Posts/Post";
import Suggestions from "../components/Home/Suggestions";

export default function Home() {
  let posts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-2 max-md:grid-cols-1 max-md:w-[80%] max-sm:w-[100%] w-[50%] m-auto">
        <div>
          {posts.map((a) => {
            return <Post key={a}></Post>;
          })}
        </div>

        <Suggestions></Suggestions>
      </div>
    </div>
  );
}
