import axios from "axios";

export default function getUserDetailsUsingId(userId) {
  return axios.get(process.env.REACT_APP_SERVER + `user/getWithID/${userId}`, { withCredentials: true });
}
