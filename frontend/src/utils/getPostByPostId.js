import axios from "axios";

export default function getPostDataByPostId(id) {
  return axios.get(process.env.REACT_APP_SERVER + `post/post/${id}`, { withCredentials: true });
}
