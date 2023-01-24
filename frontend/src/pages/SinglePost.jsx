import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { userContext } from "../context/UserContextProider";
import NotFound from "./NotFound";
import EmojiPicker from "emoji-picker-react";
import createCommentWithData from "../utils/createCommentWithData";
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
import { useEffect } from "react";
import getPostDataByPostId from "../utils/getPostByPostId";
import { useToast } from "@chakra-ui/react";
import unlikePost from "../utils/UnlikePost";
import likePost from "../utils/likePost";
import getUserDetailsUsingId from "../utils/getUserDetailsUsingId";
import LikeList from "../components/Posts/LikeList";
import DeleteMenu from "../components/Posts/DeleteMenu";
import socket from "../socket";
import uuid from "react-uuid";
import fetchAllComments from "../utils/fetchAllComments";
export default function SinglePost() {
  const [like, setLike] = useState(false);
  const [firstLikedBy, setFirstLikedBy] = useState("");
  const [bookmark, setBookmark] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const toast = useToast();
  const [post, setPost] = useState({});
  const { id } = useParams();
  const { profileData } = useContext(userContext);
  const [showLikeList, setShowLikeList] = useState(false);
  const [showDeleteMenu, setShowDeleteMenu] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [commentArray, setCommentArray] = useState([]);
  const [render, setRender] = useState(1);
  useEffect(() => {
    fetchAllComments(id).then((res) => {
      let commentArrayRes = res.data.comments.map((cmt) => JSON.parse(cmt));
      setCommentArray([...commentArrayRes]);
    });
  }, [render]);
  useEffect(() => {
    getPostDataByPostId(id)
      .then((res) => {
        setPost({ ...res.data.posts });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [like]);
  useEffect(() => {
    if (post.like?.length > 0) {
      getUserDetailsUsingId(post.like[0]).then((res) => {
        setFirstLikedBy(res.data.data.username);
      });
    }
    if (post.like?.includes(profileData._id)) setLike(true);
  }, [post]);
  // Toggle Like Function
  function toggleLike() {
    if (like) {
      unlikePost(post._id)
        .then((res) => {
          toast({
            title: "Unliked Success",
            status: "warning",
            description: "successfully unliked !",
            isClosable: true,
            duration: 2000,
          });
          setLike(false);
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
      likePost(post._id)
        .then((res) => {
          toast({
            title: "Like Success",
            status: "success",
            description: "successfully liked !",
            isClosable: true,
            duration: 2000,
          });
          setLike(true);
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
  const onEmojiClick = (emojiObject, event) => {
    setChosenEmoji(emojiObject);
    setCommentValue(commentValue + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  // Open Emoji Box

  function openEmojiMenu() {
    if (showEmojiPicker) setShowEmojiPicker(false);
    else setShowEmojiPicker(true);
  }

  if (Object.keys(post).length === 0) {
    return <NotFound />;
  }

  // Handle Comment Post
  socket.on(`get-comment-${post._id}`, (data) => {
    setCommentArray([...commentArray, data]);
  });
  function handleCommentPost() {
    let comment = { id: uuid(), postId: post._id, text: commentValue, likes: 0, profileData: profileData };
    setCommentArray([...commentArray, comment]);

    createCommentWithData(comment)
      .then((res) => {
        socket.emit("create-comment", comment, post._id);
        toast({
          title: "Commented Successfully !",
          status: "success",
          description: "successfully commented on post",
          isClosable: true,
          duration: 2000,
        });
      })
      .catch((err) => {
        toast({
          title: "Comment Failed !",
          status: "warning",
          description: "failed to comment on post",
          isClosable: true,
          duration: 2000,
        });
      });
  }
  // Handle Delete

  socket.on(`delete-comment`, (commentId) => {
    let newArr = commentArray.filter((each) => {
      if (each.id != commentId) return each;
    });
    setCommentArray([...newArr]);
  });
  return (
    <div>
      <Navbar></Navbar>
      <div className="flex max-md:flex-col max-md:w-[80%] border border-[#DBDBDB]-500 w-[50%] h-[700px] m-auto mt-10">
        <div className="max-md:w-[100%] w-[60%]">
          <img className="w-[100%] h-[100%]" src={post.image} alt="" />
        </div>
        <div className="max-md:w-[100%] w-[40%] p-4">
          <div className="flex align-middle pb-4 relative">
            <Link to={`/${post.author.username}`}>
              <img className="rounded-full w-[30px] h-[30px] mr-[20px]" src={post.author.profileImage} alt="" />
            </Link>
            <Link to={`/${post.author.username}`}>
              <p className="font-semibold">{post.author.username}</p>
            </Link>
            {showDeleteMenu && <DeleteMenu setShowDeleteMenu={setShowDeleteMenu} postID={post._id} author={post.author} />}
            <EllipsisHorizontalIcon
              onClick={() => {
                setShowDeleteMenu(true);
              }}
              width={25}
              className="absolute right-[0px] cursor-pointer"
            />
          </div>
          <hr className="border-t-1 border-[#DBDBDB]-400 w-[109%] -ml-[16px]" />

          <Comments caption={post.caption} postData={post} profileData={profileData} commentsArr={commentArray} setRender={setRender} />
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
              {showLikeList && <LikeList listData={post.like} setShowLikeList={setShowLikeList} />}
              {post.like.length === 0 && <p className="cursor-pointer py-3">No Likes</p>}
              {firstLikedBy && post.like.length > 0 && (
                <p
                  className="cursor-pointer py-3"
                  onClick={() => {
                    setShowLikeList(true);
                  }}
                >
                  Liked by <Link to={`/${firstLikedBy}`}>{firstLikedBy}</Link> and {post.like.length - 1} others
                </p>
              )}
            </div>
            <div className="flex relative mt-[12px]">
              <FaceSmileIcon onClick={openEmojiMenu} width={25} className="cursor-pointer" />
              <input
                onChange={({ target }) => {
                  setCommentValue(target.value);
                }}
                value={commentValue}
                type="text"
                className="p-2 outline-none"
                placeholder="Add a comment...."
              />
              <button onClick={handleCommentPost} className="absolute right-[0px] top-3 text-[#0095F6]">
                Post
              </button>
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
