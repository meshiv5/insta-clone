import axios from "axios";

export default function createCommentWithData(commentData) {
  return axios.post(
    process.env.REACT_APP_SERVER + `post/comment`,
    { commentData },

    {
      headers: {
        access_token: JSON.parse(localStorage.getItem("token")),
      },
      withCredentials: true,
    }
  );
}
