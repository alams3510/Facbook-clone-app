import "./share.css";
import {
  MdPermMedia,
  MdLabel,
  MdOutlineRoom,
  MdEmojiEmotions,
} from "react-icons/md";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRef } from "react";
import { useState } from "react";
import axiosInstance from "../../services/instance";

const Share = () => {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();

  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newpost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newpost.img = fileName;
      try {
        await axiosInstance.post("/upload", data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      await axiosInstance.post("/posts", newpost);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="shareContainer">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "/person/noAvatar.png"
            }
            alt="img"
            className="shareImg"
          />
          <input
            ref={desc}
            type="text"
            className="shareText"
            placeholder={`What's in your Mind ${user.username} ?`}
          />
        </div>

        <div className="shareMid">
          <hr className="shareLine" />
          {file && (
            <div className="shareImgContainer">
              <span className="shareCancelImg" onClick={() => setFile(null)}>
                X
              </span>
              <img
                className="shareImgs"
                src={URL.createObjectURL(file)}
                alt=""
              />
            </div>
          )}
        </div>

        <form className="shareDown" onSubmit={submitHandler}>
          <div className="shareOptions">
            <div className="photoUpload">
              <MdPermMedia id="photo" className="shareIcon" />
              <label htmlFor="file" className="uploadText">
                Photo or Video
              </label>
              <input
                style={{ display: "none" }}
                id="file"
                type="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div className="photoUpload">
              <MdLabel id="tag" className="shareIcon" />
              <span className="uploadText">Tag</span>
            </div>
            <div className="photoUpload">
              <MdOutlineRoom id="loc" className="shareIcon" />
              <span className="uploadText">Location</span>
            </div>
            <div className="photoUpload">
              <MdEmojiEmotions id="feel" className="shareIcon" />
              <span className="uploadText">Feelings</span>
            </div>
          </div>
          <div className="shareBtn">
            <button className="sbtn" type="submit">
              share
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Share;
