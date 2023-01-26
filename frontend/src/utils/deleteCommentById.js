import axios from "axios";

export default function deleteCommentWithID(postId, commentID) {
  return axios.delete(
    process.env.REACT_APP_SERVER + `post/comment/${postId}/${commentID}`,

    {
      headers: {
        access_token: JSON.parse(localStorage.getItem("token")),
      },
      withCredentials: true,
    }
  );
}
