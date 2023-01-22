import React, { useState } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as DarkHeartIcon } from "@heroicons/react/24/solid";
export default function Comments({ commentsArr, profileData }) {
  return (
    <div className="overflow-y-auto h-[470px] no-scrollbar [&::-webkit-scrollbar]:hidden ">
      <div className="relative flex align-middle  pt-[20px]">
        <img className="rounded-full w-[30px] h-[30px] mr-[20px]" src={profileData.profileImage} alt="" />
        <p className="text-md">Hello This is My First Post</p>
      </div>
      {commentsArr.map((cmt) => {
        return <SingleComment key={cmt} profileData={profileData} />;
      })}
    </div>
  );
}

export function SingleComment({ profileData }) {
  const [like, setLike] = useState(false);
  function toggleLike() {
    if (like) setLike(false);
    else setLike(true);
  }
  return (
    <div className="relative flex align-middle pb-[20px] pt-[20px]">
      <img className="rounded-full w-[30px] h-[30px] mr-[20px]" src={profileData.profileImage} alt="" />
      <p className="text-md">Hello This is My First Post</p>
      {like ? (
        <DarkHeartIcon onClick={toggleLike} color="red" width={15} className="absolute right-0 top-7 cursor-pointer" />
      ) : (
        <HeartIcon onClick={toggleLike} width={15} className="absolute right-0 top-7 cursor-pointer" />
      )}
    </div>
  );
}
