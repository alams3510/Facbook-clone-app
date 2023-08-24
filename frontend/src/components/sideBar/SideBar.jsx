import "./sidebar.css";
import {
  MdOutlineRssFeed,
  MdHelpOutline,
  MdWorkOutline,
  MdEmojiEvents,
  MdSchool,
} from "react-icons/md";
import {
  BsFillChatSquareTextFill,
  BsFillPlayCircleFill,
  BsFillBookmarkFill,
} from "react-icons/bs";
import { GrGroup } from "react-icons/gr";
const SideBar = () => {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="sidebarContainer">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarItem">
            <MdOutlineRssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarItem">
            <BsFillChatSquareTextFill className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarItem">
            <BsFillPlayCircleFill className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarItem">
            <GrGroup className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarItem">
            <BsFillBookmarkFill className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmark</span>
          </li>
          <li className="sidebarItem">
            <MdHelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarItem">
            <MdWorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarItem">
            <MdEmojiEvents className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarItem">
            <MdSchool className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <div className="btn">
          <button className="button">Show More..</button>
        </div>
        <hr className="hrLine" />
        <div className="sidebarFriends">
          <img src={PF+"person/4.jpeg"} alt="img" className="sidebarImg" />
          <span className="sidebarName">fake name</span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
