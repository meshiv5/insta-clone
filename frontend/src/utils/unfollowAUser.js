import axios from "axios";

export default function unfollowAUser(id) {
  return axios.post(
    process.env.REACT_APP_SERVER + `user/unfollow/${id}`,
    {},

    {
      headers: {
        access_token: JSON.parse(localStorage.getItem("token")),
      },
      withCredentials: true,
    }
  );
}
