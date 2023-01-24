import axios from "axios";

export default function getPostForHomeFeed() {
  return axios.get(process.env.REACT_APP_SERVER + "post/all", { withCredentials: true });
}
