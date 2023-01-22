import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { userContext } from "../context/UserContextProider";
import NotFound from "./NotFound";
import EmojiPicker from "emoji-picker-react";
import {
  EllipsisHorizontalIcon,
  HeartIcon,
  PaperAirplaneIcon,
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as DarkHeartIcon, BookmarkIcon as DarkBookmarkIcon } from "@heroicons/react/24/solid";
import Comments from "../components/Posts/Comments";

export default function SinglePost() {
  const [like, setLike] = useState(false);
  const [bookmark, setBookmark] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const { id } = useParams();
  const { postData, profileData } = useContext(userContext);
  let post = {};
  postData.forEach((p) => {
    if (p._id === id) post = { ...p };
  });
  if (Object.keys(post).length === 0) {
    return <NotFound />;
  }
  // Toggle Like Function
  function toggleLike() {
    if (like) {
      setLike(false);
    } else setLike(true);
  }
  // Toggle bookmark Function

  function toggleBookmark() {
    if (bookmark) {
      setBookmark(false);
    } else setBookmark(true);
  }

  // On emoji button Click
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  // Open Emoji Box

  function openEmojiMenu() {
    if (showEmojiPicker) setShowEmojiPicker(false);
    else setShowEmojiPicker(true);
  }
  return (
    <div>
      <Navbar></Navbar>
      <div className="flex max-md:flex-col max-md:w-[80%] border border-[#DBDBDB]-500 w-[50%] h-[700px] m-auto mt-10">
        <div className="max-md:w-[100%] w-[60%]">
          <img
            className="w-[100%] h-[100%]"
            src={"https://s3.amazonaws.com/www-inside-design/uploads/2020/10/aspect-ratios-blogpost-1x1-1.png"}
            alt=""
          />
        </div>
        <div className="max-md:w-[100%] w-[40%] p-4">
          <div className="flex align-middle pb-4 relative">
            <img className="rounded-full w-[30px] h-[30px] mr-[20px]" src={profileData.profileImage} alt="" />
            <p className="font-semibold">meshiv5</p>
            <EllipsisHorizontalIcon width={25} className="absolute right-[0px] cursor-pointer" />
          </div>
          <hr className="border-t-1 border-[#DBDBDB]-400 w-[109%] -ml-[16px]" />

          <Comments
            profileData={profileData}
            commentsArr={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]}
          />
          <hr className="border-t-1 border-[#DBDBDB]-400 w-[109%] -ml-[16px]" />
          <div className="p-3">
            <div className="flex relative">
              {like ? (
                <DarkHeartIcon onClick={toggleLike} color="red" width={25} className="right-[0px] cursor-pointer mr-4" />
              ) : (
                <HeartIcon onClick={toggleLike} width={25} className="right-[0px] cursor-pointer mr-4" />
              )}
              <ChatBubbleOvalLeftIcon width={25} className=" right-[0px] cursor-pointer -rotate-90 mr-4" />
              <PaperAirplaneIcon width={25} className=" right-[0px] cursor-pointer -rotate-45" />
              {bookmark ? (
                <DarkBookmarkIcon onClick={toggleBookmark} width={25} className="absolute right-[0px] cursor-pointer" />
              ) : (
                <BookmarkIcon onClick={toggleBookmark} width={25} className="absolute right-[0px] cursor-pointer" />
              )}
            </div>
            <div>
              <p className="cursor-pointer py-3">Liked by 25.shubham_ and others</p>
              <p className="text-[10px] text-[#8E8E8E] cursor-pointer">DECEMBER 4, 2021</p>
            </div>
            <div className="flex relative mt-[12px]">
              <FaceSmileIcon onClick={openEmojiMenu} width={25} className="cursor-pointer" />
              <input type="text" className="p-2 outline-none" placeholder="Add a comment...." />
              <button className="absolute right-[0px] text-[#0095F6]">Post</button>
            </div>
            {showEmojiPicker && (
              <div className="relative">
                <div className="absolute w-[117%] bottom-[153px] right-[-29px]">
                  <EmojiPicker searchDisabled={true} width={"100%"} height={"300px"} onEmojiClick={onEmojiClick} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
