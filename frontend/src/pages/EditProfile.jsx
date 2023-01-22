import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import ChangePassword from "../components/Settings/ChangePassword";
import EditUser from "../components/Settings/EditUser";
import Navbar from "../components/Navbar/Navbar";
import { userContext } from "../context/UserContextProider";

export default function EditProfile() {
  const { profileData } = useContext(userContext);
  const location = useLocation();
  return (
    <div>
      <Navbar></Navbar>
      <section className="border border-gray-200 grid grid-cols-3 max-md:grid-cols-1 w-3/6 max-md:w-80 m-auto mt-10">
        <div className="border-r max-md:invisible p-4">
          <p className="mb-2 text-sm">
            <Link
              className={
                location.pathname === "/edit/user"
                  ? "font-semibold before:content-[''] before:border-r-2 before:border-black before:relative before:right-4"
                  : ""
              }
              to={"/edit/user"}
            >
              Edit Profile
            </Link>
          </p>
          <p className="text-sm">
            <Link
              className={
                location.pathname === "/edit/change"
                  ? "font-semibold before:content-[''] before:border-r-2 before:border-black before:relative before:right-4"
                  : ""
              }
              to={"/edit/change"}
            >
              Change Password
            </Link>
          </p>
        </div>
        {location.pathname === "/edit/user" && <EditUser profileData={profileData} />}
        {location.pathname === "/edit/change" && <ChangePassword profileData={profileData} />}
      </section>
    </div>
  );
}
