import axios from "axios";

export default function getRandomNewUsers(query) {
  if (!query) return axios.get(process.env.REACT_APP_SERVER + "user/many", { withCredentials: true });
  return axios.get(process.env.REACT_APP_SERVER + `user/many?search=${query}`, { withCredentials: true });
}
