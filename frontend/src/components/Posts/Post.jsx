import {
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  EllipsisHorizontalIcon,
  FaceSmileIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import EmojiPicker from "emoji-picker-react";
import React, { useContext, useState } from "react";
import { userContext } from "../../context/UserContextProider";
import Comments from "./Comments";
import { HeartIcon as DarkHeartIcon, BookmarkIcon as DarkBookmarkIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import likePost from "../../utils/likePost";
import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import unlikePost from "../../utils/UnlikePost";
import getUserDetailsUsingID from "../../utils/getUserDetailsUsingId";
import LikeList from "./LikeList";
import DeleteMenu from "./DeleteMenu";
export default function Post({ postData, setReRenderPost, firstLikeID }) {
  const [like, setLike] = useState(false);
  const [bookmark, setBookmark] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { profileData, setUpdateIt } = useContext(userContext);
  const [firstLike, setFirstLike] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();
  const [showLikeList, setShowLikeList] = useState(false);
  const [showDeleteMenu, setShowDeleteMenu] = useState(false);
  // ComponenetDidMount TO Check If Post Already Like And Set State Accordingiliy;
  useEffect(() => {
    if (postData.like.includes(profileData._id)) setLike(true);
    if (firstLikeID)
      getUserDetailsUsingID(firstLikeID).then((res) => {
        setFirstLike(res.data.data.username);
      });
  }, [postData, profileData]);

  // Toggle Like Function

  function toggleLike() {
    if (like) {
      unlikePost(postData._id)
        .then((res) => {
          toast({
            title: "Unliked Success",
            status: "warning",
            description: "successfully unliked !",
            isClosable: true,
            duration: 2000,
          });
          setLike(false);
          setReRenderPost((old) => old + 1);
        })
        .catch((err) => {
          toast({
            title: "Failed To UnLike",
            status: "error",
            description: "some error occured",
            isClosable: true,
            duration: 2000,
          });
        });
    } else {
      likePost(postData._id)
        .then((res) => {
          toast({
            title: "Like Success",
            status: "success",
            description: "successfully liked !",
            isClosable: true,
            duration: 2000,
          });
          setLike(true);
          setReRenderPost((old) => old + 1);
        })
        .catch((err) => {
          toast({
            title: "Failed To Like",
            status: "error",
            description: "some error occured",
            isClosable: true,
            duration: 2000,
          });
        });
    }
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
    <div className="flex max-md:flex-col max-md:w-[80%] border border-[#DBDBDB]-500 w-[100%] h-max m-auto mt-10">
      <div className="max-md:w-[100%] w-[100%] p-4 cursor-pointer">
        <div
          onClick={(e) => {
            if (e.target.tagName === "svg" || e.target.tagName === "input" || e.target.tagName === "BUTTON") return;
            navigate(`/post/${postData._id}`);
          }}
          className="flex align-middle pb-4 relative"
        >
          <img className="rounded-full w-[30px] h-[30px] mr-[20px]" src={postData.author.profileImage} alt="" />
          <p className="font-semibold">{postData.author.username}</p>
          {showDeleteMenu && (
            <DeleteMenu setShowDeleteMenu={setShowDeleteMenu} postID={postData._id} author={postData.author} setReRenderPost={setReRenderPost} />
          )}
          <EllipsisHorizontalIcon
            onClick={() => {
              setShowDeleteMenu(true);
            }}
            width={25}
            className="absolute right-[0px] cursor-pointer"
          />
        </div>
        <hr className="border-t-1 border-[#DBDBDB]-400 w-[109%] -ml-[16px]" />
        <Link to={`/post/${postData._id}`}>
          <img width={"109%"} src={postData.image} alt="" />
        </Link>
        <hr className="border-t-1 border-[#DBDBDB]-400 w-[109%] -ml-[16px]" />
        <div className="p-3">
          <div className="flex relative">
            {like ? (
              <DarkHeartIcon onClick={toggleLike} color="red" width={25} className="right-[0px] cursor-pointer mr-4" />
            ) : (
              <HeartIcon onClick={toggleLike} width={25} className="right-[0px] cursor-pointer mr-4" />
            )}
            <Link to={`/post/${postData._id}`}>
              <ChatBubbleOvalLeftIcon width={25} className=" right-[0px] cursor-pointer -rotate-90 mr-4" />
            </Link>

            <PaperAirplaneIcon width={25} className=" right-[0px] cursor-pointer -rotate-45" />
            {bookmark ? (
              <DarkBookmarkIcon onClick={toggleBookmark} width={25} className="absolute right-[0px] cursor-pointer" />
            ) : (
              <BookmarkIcon onClick={toggleBookmark} width={25} className="absolute right-[0px] cursor-pointer" />
            )}
          </div>
          <div>
            {showLikeList && <LikeList listData={postData.like} setShowLikeList={setShowLikeList} />}
            {postData.like.length === 0 && <p className="cursor-pointer py-3">No Likes</p>}
            {firstLike && postData.like.length > 0 && (
              <p
                className="cursor-pointer py-3"
                onClick={() => {
                  setShowLikeList(true);
                }}
              >
                Liked by <Link to={`/${firstLike}`}>{firstLike}</Link> and {postData.like.length - 1} others
              </p>
            )}
            <Link to={`/post/${postData._id}`}>
              <p className="text-[14px] text-[#8E8E8E] cursor-pointer">View all {postData.comments.length} comments</p>
            </Link>
          </div>
          <div className="flex relative mt-[12px]">
            <FaceSmileIcon onClick={openEmojiMenu} width={25} className="cursor-pointer" />
            <input
              onClick={() => {
                navigate(`/post/${postData._id}`);
              }}
              type="text"
              className="p-2 outline-none"
              placeholder="Add a comment...."
            />
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
  );
}
