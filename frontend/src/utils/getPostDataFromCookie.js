import axios from "axios";

export default function getUserDetails() {
  return axios.get(process.env.REACT_APP_SERVER + "post", { withCredentials: true });
}
