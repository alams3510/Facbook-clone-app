import "./rightbar.css";
import { GrFormAdd } from "react-icons/gr";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import axiosInstance from "../../services/instance";

const RightBar = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [friend, setFriend] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [follow, setFollow] = useState(false);
  // console.log(follow);
  // console.log(user, "user");
  // console.log(currentUser, "currentUser");
  useEffect(() => {
    const fetchFriendlist = async () => {
      try {
        const friendList = await axiosInstance.get(
          "/users/friends/" + currentUser._id
        );
        setFriend(friendList.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFriendlist();
  }, [currentUser._id]);

  useEffect(() => {
    setFollow(currentUser.followings.includes(user?._id));
  }, [user, currentUser.followings]);

  const handleFollow = async () => {
    try {
      if (!follow) {
        await axiosInstance.put("/users/" + user._id + "/follow", {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
        enqueueSnackbar({
          variant: "success",
          message: "You have started following " + user.username,
        });
      } else {
        await axiosInstance.put("/users/" + user._id + "/unfollow", {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
        enqueueSnackbar({
          variant: "warning",
          message: "You have unfollowed " + user.username,
        });
      }
    } catch (error) {
      enqueueSnackbar({
        variant: "warning",
        message: "You can not follow " + user.username,
      });
    }
    setFollow(!follow);
  };
  useEffect(
    () => async () => {
      const allUserList = await axiosInstance.get("/users/allUsers");
      setAllUsers(allUserList.data);
    },
    []
  );
  const HomeRightBar = () => {
    return (
      <div className="rightbarContainer">
        <div className="rightbarWrapper">
          <div className="birthdayGift">
            <img src="./asset/gift.png" alt="" className="bday" />
            <span className="rightbarGiftText">
              <b>Pola foster</b> and <b>2 other</b> have Birthday Today
            </span>
          </div>

          <div className="rightbarAd">
            <img src="./asset/ad.jpeg" alt="" className="ad" />
          </div>

          <div className="onlineFriends">
            <span className="onlineText">
              Total Online Users : {allUsers.length - 1}
            </span>
            <div style={{ width: "70%" }}>
              {allUsers
                .filter((val) => val.username !== currentUser.username)
                .map((friend) => {
                  return (
                    <Link to={"/profile/" + friend.username}>
                      <div className="friends" key={friend._id}>
                        <div className="online">
                          <img
                            src={
                              friend.profilePicture
                                ? PF + friend.profilePicture
                                : PF + "/person/noAvatar.png"
                            }
                            alt=""
                            className="onlinePic"
                          />

                          <span className="status"></span>
                        </div>
                        <span className="onlineName">{friend.username}</span>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ProfileRightBar = () => {
    return (
      <div className="profileContainer">
        {currentUser.username !== user.username ? (
          <button className="followbtn" onClick={handleFollow}>
            <div>{follow ? "UnFollow" : "Follow"}</div>{" "}
            <GrFormAdd className="addicon" />
          </button>
        ) : (
          <div style={{ marginBottom: "10px" }}>
            <p>
              You are <b>following {currentUser.followings.length}</b> person
            </p>
            <p>
              You have <b>{currentUser.followers.length} Folowers</b>
            </p>
          </div>
        )}
        <div className="userInfo">
          <h4 className="userHeading">User Information</h4>
          <div className="userdetails">
            <span>
              <b>City</b> {user.city}
            </span>
            <span>
              <b>From</b> {user.from}
            </span>
            <span>
              <b>RelationShip</b>{" "}
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : ""}
            </span>
          </div>
          <div className="userFriends">
            <h2>My Friends</h2>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {friend.map((friend) => {
                return (
                  <div style={{ width: "120px", margin: "5px" }}>
                    <Link to={"/profile/" + friend.username}>
                      <img
                        src={
                          friend.profilePicture
                            ? PF + friend.profilePicture
                            : PF + "/person/noAvatar.png"
                        }
                        alt="img"
                        className="friendImg"
                      />

                      <div className="userName">{friend.username}</div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };
  return user ? <ProfileRightBar /> : <HomeRightBar />;
};

export default RightBar;
