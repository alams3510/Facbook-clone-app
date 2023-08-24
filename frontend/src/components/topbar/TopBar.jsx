import "./topbar.css";
import { FiSearch } from "react-icons/fi";
import { BsPersonFill, BsFillChatLeftDotsFill } from "react-icons/bs";
import { IoMdNotifications } from "react-icons/io";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Form from "../profileForm/Form";
import { enqueueSnackbar } from "notistack";
import axiosInstance from "../../services/instance";

const TopBar = ({ tempuser }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [openProfile, setOpenProfile] = useState(false);
  const [modal, setModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const { user } = useContext(AuthContext);
  // console.log(user, "user from topbar");
  // console.log(tempuser, " tempuser");
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  const deleteAccount = async () => {
    try {
      alert("Are you Sure to delete Your Account Permanently??");
      await axiosInstance.delete("/users/" + user._id);
      await axiosInstance.delete("/posts/" + user._id);
      localStorage.removeItem("user");
      window.location.reload();
      enqueueSnackbar({
        variant: "success",
        message: "you have deleted" + user.username + "Permanently",
      });
    } catch (error) {
      // console.error(error);
      enqueueSnackbar({
        variant: "error",
        message: error,
      });
    }
  };
  const handleUpdatePassword = async () => {
    if (password != null) {
      try {
        await axiosInstance.put("/users/" + user._id + "/updatePassword", {
          password,
        });
        setPasswordModal(false);
        enqueueSnackbar({
          variant: "success",
          message: "Password Updated Successfully",
        });
        setPassword("");
      } catch (error) {
        // console.log(error);
        enqueueSnackbar({
          variant: "error",
          message: error,
        });
      }
    }
  };
  // console.log(password);
  return (
    <>
      <div className="topbarContainer">
        <div className="tobarLeft">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logo">facebook</span>
          </Link>
        </div>

        <div className="topbarMid">
          <div className="searchBar">
            <FiSearch className="searchIcon" />
            <input
              placeholder="Search for friends or videos"
              type="text"
              className="search"
            />
          </div>
        </div>
        <div className="topRight">
          <div className="topRightwrapper">
            <div className="textLink">
              <Link to={`/`}>
                {" "}
                <span style={{ textDecoration: "none" }} className="text">
                  HomePage
                </span>
              </Link>
              <Link to={`/profile/${user.username}`}>
                <span className="text">Timeline</span>
              </Link>
            </div>
            <div className="linkIcons">
              <div className="icon">
                <BsPersonFill />
                <span className="num">1</span>
              </div>
              <div className="icon">
                <BsFillChatLeftDotsFill />
                <span className="num">1</span>
              </div>
              <div className="icon">
                <IoMdNotifications />
                <span className="num">2</span>
              </div>
            </div>
            <div className="profileLink">
              {/* <Link to={`/profile/${user.username}`}> */}
              <img
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt="img"
                className="profileImgbar"
                onClick={() => setOpenProfile(!openProfile)}
              />
              {/* </Link> */}
            </div>
          </div>
        </div>
      </div>
      {openProfile && (
        <div className="profileModal">
          <ul>
            <li
              onClick={() => {
                setModal(true);
                setOpenProfile(false);
              }}
            >
              Profile setting
            </li>
            <hr />
            <li
              onClick={() => {
                setPasswordModal(!passwordModal);
                setOpenProfile(false);
              }}
            >
              Update Password
            </li>
            <hr />
            <li onClick={handleLogout}>Logout</li>
            <hr />

            <li
              style={{ color: "red", fontWeight: "500" }}
              onClick={deleteAccount}
            >
              Delete Account
            </li>
          </ul>
        </div>
      )}
      {modal && (
        <div className="formWrapper">
          <Form user={user} setModal={setModal} />
        </div>
      )}
      {passwordModal && (
        <div className="formWrapper">
          <div
            style={{ display: "flex", flexDirection: "column", margin: "10px" }}
          >
            <label style={{ color: "white" }}>Enter your New Password</label>
            <input
              style={{ height: "25px", textAlign: "center" }}
              type="password"
              placeholder="please enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <button
              onClick={handleUpdatePassword}
              style={{
                margin: "2px",
                backgroundColor: "green",
                color: "white",
                outline: "none",
                border: "none",
                padding: "2px",
              }}
            >
              Change Password
            </button>
            <button
              onClick={() => setPasswordModal(false)}
              style={{
                margin: "2px",
                backgroundColor: "red",
                color: "white",
                outline: "none",
                border: "none",
                padding: "2px",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TopBar;
