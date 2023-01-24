import { useToast } from "@chakra-ui/react";
import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../context/UserContextProider";
import socket from "../../socket";
import deleteCommentWithID from "../../utils/deleteCommentById";

export default function CommentDeleteMenu({ setShowDeleteMenu, commentId, setRender, postData }) {
  const toast = useToast();
  const navigate = useNavigate();
  const { setUpdateIt, profileData } = useContext(userContext);
  function deleteComment(id) {
    deleteCommentWithID(postData._id, id)
      .then((res) => {
        toast({
          title: "Comment Deleted Successfully !",
          status: "success",
          description: "your post has been deleted successfully !",
          isClosable: true,
          duration: 2000,
        });
        if (setRender) setRender((old) => old + 1);
        socket.emit(`delete-comment`, commentId);
      })
      .catch((err) => {
        toast({
          title: "Failed To Delete",
          status: "warning",
          description: "Some Error Occured",
          isClosable: true,
          duration: 2000,
        });
      });
  }
  return (
    <div className="fixed bottom-0 inset-x-0 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center z-10">
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
        <div className="bg-white sm:p-6 sm:pb-4">
          <h1 className="text-center font-semibold pb-4">Delete Comment</h1>
          <hr className="w-[100%]" />
        </div>
        <div className=" w-[100%]"></div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
            {true && (
              <button
                onClick={() => {
                  deleteComment(commentId);
                  setShowDeleteMenu(false);
                }}
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-red-500 text-base leading-6 font-medium text-white shadow-sm hover:text-white-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-white-800 ml-[20px]"
              >
                Confirm
              </button>
            )}
          </span>
          <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
            <button
              onClick={() => {
                setShowDeleteMenu(false);
              }}
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
            >
              Cancel
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}
