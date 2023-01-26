import axios from "axios";

export default function getRandomNewUsers(query) {
  if (!query)
    return axios.get(
      process.env.REACT_APP_SERVER + "user/many",

      {
        headers: {
          access_token: JSON.parse(localStorage.getItem("token")),
        },
        withCredentials: true,
      }
    );
  return axios.get(
    process.env.REACT_APP_SERVER + `user/many?search=${query}`,

    {
      headers: {
        access_token: JSON.parse(localStorage.getItem("token")),
      },
      withCredentials: true,
    }
  );
}
