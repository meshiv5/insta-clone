import React, { useState } from "react";
import { EllipsisHorizontalIcon, HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as DarkHeartIcon } from "@heroicons/react/24/solid";
import CommentDeleteMenu from "./CommentDeleteMenu";
export default function Comments({ caption, commentsArr, profileData, postData, setRender }) {
  return (
    <div className="overflow-y-auto h-[470px] no-scrollbar [&::-webkit-scrollbar]:hidden ">
      <div className="relative flex align-middle  pt-[20px]">
        <img className="rounded-full w-[30px] h-[30px] mr-[20px]" src={postData.author.profileImage} alt="" />
        <p className="text-md font-semibold">{caption} -</p>
      </div>
      {commentsArr.map((commentData) => {
        return <SingleComment key={commentData.id} commentData={commentData} setRender={setRender} postData={postData} postOwner={profileData} />;
      })}
    </div>
  );
}

export function SingleComment({ commentData, setRender, postData, postOwner }) {
  const [showDeleteMenu, setShowDeleteMenu] = useState(false);
  return (
    <div className="relative flex align-middle  pt-[20px]">
      <img className="rounded-full w-[30px] h-[30px] mr-[20px]" src={commentData.profileData.profileImage} alt="" />
      <p className="text-md w-72">{commentData.text}</p>
      {showDeleteMenu && (
        <CommentDeleteMenu setShowDeleteMenu={setShowDeleteMenu} commentId={commentData.id} setRender={setRender} postData={postData} />
      )}
      {(postOwner._id === commentData.profileData._id || postOwner._id === postData.author._id) && (
        <EllipsisHorizontalIcon
          onClick={() => {
            setShowDeleteMenu(true);
          }}
          width={25}
          className="absolute right-[0px] cursor-pointer"
        />
      )}
    </div>
  );
}
