import axios from "axios";

export default function getPostDataByPostId(id) {
  return axios.get(
    process.env.REACT_APP_SERVER + `post/post/${id}`,

    {
      headers: {
        access_token: JSON.parse(localStorage.getItem("token")),
      },
      withCredentials: true,
    }
  );
}
