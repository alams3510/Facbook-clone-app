import { useEffect } from "react";
import { useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axiosInstance from "../../services/instance";

const Feed = ({ username }) => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axiosInstance.get("/posts/profile/" + username)
        : await axiosInstance.get(`posts/timeline/${user._id}`);
      setPosts(res.data);
      res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      });
    };
    fetchPosts();
  }, [username, user._id]);

  return (
    <div className="feedContainer">
      {username ? "" : <Share />}
      {posts.length > 0 ? (
        posts.map((posts) => {
          return <Post posts={posts} key={posts._id} />;
        })
      ) : (
        <h1 style={{ textAlign: "center", color: "grey", marginTop: "20px" }}>
          You have No post yet
        </h1>
      )}
    </div>
  );
};

export default Feed;
