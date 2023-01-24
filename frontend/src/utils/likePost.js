import axios from "axios";

export default function likePost(postId) {
  return axios.post(process.env.REACT_APP_SERVER + `post/like/${postId}`, {}, { withCredentials: true });
}
