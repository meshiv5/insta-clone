import axios from "axios";

export default function unlikePost(postId) {
  return axios.post(
    process.env.REACT_APP_SERVER + `post/unlike/${postId}`,
    {},

    {
      headers: {
        access_token: JSON.parse(localStorage.getItem("token")),
      },
      withCredentials: true,
    }
  );
}
