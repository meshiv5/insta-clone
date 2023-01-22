import React from "react";

export default function SingleSuggestion() {
  return (
    <div className="flex items-center relative w-72 mb-[10px]">
      <img
        className="rounded-full w-12 h-12 cursor-pointer"
        src={"https://res.cloudinary.com/dxyjefp4a/image/upload/v1673876314/2048px-Default_pfp.svg_foyepr.png"}
        alt=""
      />
      <div className="ml-[15px]">
        <p className="font-semibold text-sm relative bottom-[6px] cursor-pointer">{"Demo 1"}</p>
        <p className="text-[#8E8E8E] text-xs">{"Followed by You + 5 more"}</p>
      </div>
      <p className="text-[#0095F6] font-semibold text-xs absolute right-0 cursor-pointer">Follow</p>
    </div>
  );
}
