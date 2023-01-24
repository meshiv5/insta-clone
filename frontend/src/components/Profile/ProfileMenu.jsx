import { Box, Modal, ModalBody, ModalContent, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setAuth } from "../../redux/actions/authActions";
import { ReactComponent as ProfileIcon } from "../../svg/profileIcon.svg";
import { ReactComponent as SavedIcon } from "../../svg/savedIcon.svg";
import { ReactComponent as SetttingsIcon } from "../../svg/settingsIcon.svg";
import { ReactComponent as DayIcon } from "../../svg/dayIcon.svg";
import { useContext } from "react";
import { userContext } from "../../context/UserContextProider";
export default function ProfileMenu({ onClose, onOpen, isOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profileData } = useContext(userContext);
  const toast = useToast();
  const { isAuth } = useSelector((store) => store.auth);
  useEffect(() => {
    if (!isAuth) {
      axios
        .get(process.env.REACT_APP_SERVER + "user", { withCredentials: true })
        .then((res) => {})
        .catch((e) => {
          navigate("/login");
        });
    }
  }, [isAuth]);
  function handleLogout(e) {
    e.preventDefault();
    axios
      .get(process.env.REACT_APP_SERVER + "user/logout", { withCredentials: true })
      .then((res) => {
        dispatch(setAuth(false));
        toast({
          title: "Logout Success !",
          description: "Redirecting to login !",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      })
      .catch((e) => {
        toast({
          title: "Something Went Wrong !",
          description: e.response.data.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  }
  return (
    <Modal onClose={onClose} size={"xs"} isOpen={isOpen}>
      <ModalContent w={220} ml={800} mt={70}>
        <ModalBody pb={5} pl={5} pr={5} fontSize={14}>
          <Box mt={3}>
            <Link className="flex" to={`/${profileData.username}`} onClick={onClose}>
              <ProfileIcon /> <p className="-mt-0.5">Profile</p>
            </Link>
          </Box>
          <Box mt={3}>
            <Link className="flex" onClick={onClose}>
              <SavedIcon />
              <p className="-mt-0.5">Saved</p>
            </Link>
          </Box>
          <Box mt={3}>
            <Link className="flex" onClick={onClose}>
              <DayIcon />
              <p className="-mt-0.5">Switch Appearence</p>
            </Link>
          </Box>
          <Box mt={3} mb={3}>
            <Box className="flex">
              <SetttingsIcon />
              <p className="-mt-0.5">
                <Link to={"/edit/user"} onClick={onClose}>
                  Settings
                </Link>
              </p>
            </Box>
          </Box>

          <hr style={{ width: "180px" }} />
          <Box mt={3}>
            <Link onClick={handleLogout}>Log Out</Link>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
