import axios from "axios";

export default function getPostData(id) {
  if (!id)
    return axios.get(
      process.env.REACT_APP_SERVER + "post",

      {
        headers: {
          access_token: JSON.parse(localStorage.getItem("token")),
        },
        withCredentials: true,
      }
    );
  return axios.get(
    process.env.REACT_APP_SERVER + `post/${id}`,

    {
      headers: {
        access_token: JSON.parse(localStorage.getItem("token")),
      },
      withCredentials: true,
    }
  );
}
