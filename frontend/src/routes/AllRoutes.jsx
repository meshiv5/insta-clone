import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import Reset from "../pages/Reset";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import Inbox from "../pages/Inbox";
import CreatePost from "../components/Posts/CreatePost";
import Notifications from "../pages/Notifications";
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";
import SinglePost from "../pages/SinglePost";

export default function AllRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoutes>
            <Home />
          </PrivateRoutes>
        }
      />
      <Route
        path="/inbox"
        element={
          <PrivateRoutes>
            <Inbox />
          </PrivateRoutes>
        }
      />
      <Route
        path="/createpost"
        element={
          <PrivateRoutes>
            <CreatePost />
          </PrivateRoutes>
        }
      />
      <Route
        path="/notifications"
        element={
          <PrivateRoutes>
            <Notifications />
          </PrivateRoutes>
        }
      />
      <Route
        path="/edit/:xd"
        element={
          <PrivateRoutes>
            <EditProfile />
          </PrivateRoutes>
        }
      />
      <Route
        path="/:username"
        element={
          <PrivateRoutes>
            <Profile />
          </PrivateRoutes>
        }
      />
      <Route
        path="/post/:id"
        element={
          <PrivateRoutes>
            <SinglePost />
          </PrivateRoutes>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/reset-password" element={<Reset />} />
    </Routes>
  );
}
