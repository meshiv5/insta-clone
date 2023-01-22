import React, { useContext, useEffect, useState } from "react";
import styles from "../../styles/Navbar/Navbar.module.css";
import SearchBar from "./SearchBar";
import ProfileMenu from "../Profile/ProfileMenu";
import { ReactComponent as HomeLogoSvg } from "../../svg/homeLogo.svg";
import { ReactComponent as MessageBoxSvg } from "../../svg/messageLogo.svg";
import { ReactComponent as NewPostSvg } from "../../svg/createPost.svg";
import { ReactComponent as NotificationHeartSvg } from "../../svg/notification.svg";
import { ReactComponent as HomeLogoSvgBold } from "../../svg/homeLogoBold.svg";
import { ReactComponent as MessageBoxSvgBold } from "../../svg/messageLogoBold.svg";
import { ReactComponent as NewPostSvgBold } from "../../svg/createPostBold.svg";
import { ReactComponent as NotificationHeartSvgBold } from "../../svg/notificationBold.svg";
import { useLocation, useNavigate } from "react-router-dom";
import useMedia from "../../hooks/useMedia";
import { useDisclosure } from "@chakra-ui/react";
import { userContext } from "../../context/UserContextProider";
import CreatePost from "../Posts/CreatePost";
export default function Navbar() {
  const [isLinkActive, setIsLinkActive] = useState({
    Home: false,
    Message: false,
    NewPost: false,
    Notification: false,
  });
  const { profileData, setUpdateIt } = useContext(userContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const isMax650 = useMedia("(max-width : 650px)");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setUpdateIt((old) => old + 1);
    /*eslint-disable */
    if (location.pathname === "/") setIsLinkActive({ ...isLinkActive, Home: true });
    if (location.pathname === "/inbox") setIsLinkActive({ ...isLinkActive, Message: true });
    if (location.pathname === "/createpost") setIsLinkActive({ ...isLinkActive, NewPost: true });
    if (location.pathname === "/notifications") setIsLinkActive({ ...isLinkActive, Notification: true });
    //*eslint-enable */
  }, [location.pathname]);
  return (
    <div className={"sticky top-0 z-20 bg-white" + " " + styles.mainDiv}>
      <ProfileMenu isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <img style={{ cursor: "pointer" }} onClick={() => navigate("/")} src={require("../../images/LoginPage/insta_log.png")} alt="navLogo" />
      {isMax650 || <SearchBar />}
      <div className={styles.menuItems}>
        {isLinkActive.Home ? <HomeLogoSvgBold /> : <HomeLogoSvg onClick={() => navigate("/")} />}
        {isLinkActive.Message ? (
          <div className="relative cursor-pointer">
            <MessageBoxSvgBold />
            <div className="absolute flex items-center justify-center text-xs w-5 h-5 text-white rounded-full bg-red-500 text-s colo bottom-3 left-3">
              3
            </div>
          </div>
        ) : (
          <div className="relative  cursor-pointer">
            <MessageBoxSvg onClick={() => navigate("/inbox")} />
            <div className="absolute flex items-center justify-center text-xs w-5 h-5 text-white bg-red-500 rounded-full colo bottom-3 left-3 animate-pulse">
              3
            </div>
          </div>
        )}
        <div className="cursor-pointer">
          <CreatePost showModal={showModal} setShowModal={setShowModal} />
          {showModal ? <NewPostSvgBold /> : <NewPostSvg onClick={() => setShowModal(true)} />}
        </div>
        {isLinkActive.Notification ? (
          <div className="relative  cursor-pointer">
            <NotificationHeartSvgBold />
            <div className="absolute flex items-center justify-center text-xs w-5 h-5 text-white bg-red-500 rounded-full colo bottom-3 left-3 ">
              2
            </div>
          </div>
        ) : (
          <div className="relative  cursor-pointer">
            <NotificationHeartSvg onClick={() => navigate("/notifications")} />
            <div className="absolute flex items-center justify-center text-xs w-5 h-5 text-white bg-red-500 rounded-full colo bottom-3 left-3 animate-pulse">
              2
            </div>
          </div>
        )}
        <img className={styles.profileBtn} src={profileData.profileImage} alt="profileImage" onClick={onOpen} />
      </div>
    </div>
  );
}
