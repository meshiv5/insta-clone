import React, { createContext, useEffect, useState } from "react";
import getUserDetails from "../utils/getUserDetailsFromCookie";
import getPostData from "../utils/getPostDataFromCookie";
export const userContext = createContext();
export default function UserContextProvider({ children }) {
  const [profileData, setProfileData] = useState({});
  const [postData, setPostData] = useState([]);
  const [updateIt, setUpdateIt] = useState(1);
  useEffect(() => {
    getUserDetails().then((res) => {
      let data = res.data.data;
      setProfileData({ ...data });
    });

    getPostData().then((res) => {
      let data = res.data.posts;
      setPostData([...data]);
    });
  }, [updateIt]);
  return <userContext.Provider value={{ profileData, setProfileData, setUpdateIt, postData, setPostData }}>{children}</userContext.Provider>;
}
