import axios from "axios";

export default function followAUser(id) {
  return axios.post(process.env.REACT_APP_SERVER + `user/follow/${id}`, {}, { withCredentials: true });
}
