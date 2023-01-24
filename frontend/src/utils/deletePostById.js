import axios from "axios";

export default function deletePostById(id) {
  return axios.delete(process.env.REACT_APP_SERVER + `post/${id}`, { withCredentials: true });
}
