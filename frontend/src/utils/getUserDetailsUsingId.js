import axios from "axios";

export default function getUserDetailsUsingId(userId) {
  return axios.get(
    process.env.REACT_APP_SERVER + `user/getWithID/${userId}`,

    {
      headers: {
        access_token: JSON.parse(localStorage.getItem("token")),
      },
      withCredentials: true,
    }
  );
}
