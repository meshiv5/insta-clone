import axios from "axios";

export default function fetchAllComments(postId) {
  return axios.get(process.env.REACT_APP_SERVER + `post/comment/${postId}`, { withCredentials: true });
}
