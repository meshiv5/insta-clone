import axios from "axios";

export default function getUserDetails(username) {
  if (!username) return axios.get(process.env.REACT_APP_SERVER + "user", { withCredentials: true });
  return axios.get(process.env.REACT_APP_SERVER + `user/${username}`, { withCredentials: true });
}
