import axios from "axios";

export default function getUserDetails(username) {
  if (!username)
    return axios.get(
      process.env.REACT_APP_SERVER + "user",

      {
        headers: {
          access_token: JSON.parse(localStorage.getItem("token")),
        },
        withCredentials: true,
      }
    );
  return axios.get(
    process.env.REACT_APP_SERVER + `user/${username}`,

    {
      headers: {
        access_token: JSON.parse(localStorage.getItem("token")),
      },
      withCredentials: true,
    }
  );
}
