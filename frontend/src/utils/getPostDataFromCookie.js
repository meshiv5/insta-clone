import axios from "axios";

export default function getPostData(id) {
  if (!id) return axios.get(process.env.REACT_APP_SERVER + "post", { withCredentials: true });
  return axios.get(process.env.REACT_APP_SERVER + `post/${id}`, { withCredentials: true });
}
