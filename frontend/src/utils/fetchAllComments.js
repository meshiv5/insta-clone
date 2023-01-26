import axios from "axios";

export default function fetchAllComments(postId) {
  return axios.get(
    process.env.REACT_APP_SERVER + `post/comment/${postId}`,

    {
      headers: {
        access_token: JSON.parse(localStorage.getItem("token")),
      },
      withCredentials: true,
    }
  );
}
