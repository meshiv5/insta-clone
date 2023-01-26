import axios from "axios";

export default function deletePostById(id) {
  return axios.delete(
    process.env.REACT_APP_SERVER + `post/${id}`,

    {
      headers: {
        access_token: JSON.parse(localStorage.getItem("token")),
      },
      withCredentials: true,
    }
  );
}
