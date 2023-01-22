import React, { useContext } from "react";
import { userContext } from "../../context/UserContextProider";
import SingleSuggestion from "./SingleSuggestion";

export default function Suggestions() {
  const { profileData } = useContext(userContext);
  let users = [1, 2, 3, 4, 5];
  return (
    <div className="pl-[80px] max-md:hidden pt-10">
      <div className="flex items-center relative w-72">
        <img className="rounded-full w-14 h-14 cursor-pointer" src={profileData.profileImage} alt="" />
        <div className="ml-[30px]">
          <p className="font-semibold text-sm cursor-pointer">{profileData.username}</p>
          <p className="text-[#8E8E8E] text-sm">{profileData.name}</p>
        </div>
        <p className="text-[#0095F6] font-semibold text-xs absolute right-0 cursor-pointer">Switch</p>
      </div>
      <p className="text-[#8E8E8E] text-sm font-medium mt-[15px] mb-[20px]">Suggestions for you</p>
      {users.map((a) => {
        return <SingleSuggestion key={a} />;
      })}
    </div>
  );
}
