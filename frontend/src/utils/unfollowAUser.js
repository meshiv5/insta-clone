import axios from "axios";

export default function unfollowAUser(id) {
  return axios.post(process.env.REACT_APP_SERVER + `user/unfollow/${id}`, {}, { withCredentials: true });
}
