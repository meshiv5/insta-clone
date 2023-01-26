import axios from "axios";

export default function getPostForHomeFeed() {
  return axios.get(
    process.env.REACT_APP_SERVER + "post/all",

    {
      headers: {
        access_token: JSON.parse(localStorage.getItem("token")),
      },
      withCredentials: true,
    }
  );
}
