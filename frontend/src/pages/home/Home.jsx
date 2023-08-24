import Feed from "../../components/feed/Feed";
import RightBar from "../../components/rightbar/RightBar";
import SideBar from "../../components/sideBar/SideBar";
import TopBar from "../../components/topbar/TopBar";
import "./home.css";

const Home = () => {
  return (
    <>
      <TopBar />
      <div className="maincontainer">
        <SideBar />
        <Feed />
        <RightBar />
      </div>
    </>
  );
};

export default Home;
