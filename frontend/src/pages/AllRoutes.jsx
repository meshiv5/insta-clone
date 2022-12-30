import React from "react";
import { Route, Routes } from "react-router-dom";
import Reset from "../components/Password/Reset";
import Login from "./Login";
import Signup from "./Signup";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/reset-password" element={<Reset />} />
    </Routes>
  );
}
