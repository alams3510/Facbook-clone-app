import React, { useContext, useState } from "react";
import "./profileForm.css";
import axiosInstance from "../../services/instance";
import { AuthContext } from "../../context/AuthContext";

const Form = ({ user, setModal }) => {
  const { dispatch } = useContext(AuthContext);

  console.log(user, "user");
  const [updatedDetails, setUpdatedDetails] = useState({
    username: user.username,
    email: user.email,
    city: user.city,
    from: user.from,
    desc: user.desc,
    relationship: user.relationship,
    userId: user._id,
  });
  const handleChange = (e) => {
    setUpdatedDetails({
      ...updatedDetails,
      [e.target.name]: e.target.value,
    });
  };
  const submit = async (e) => {
    e.preventDefault();
    await axiosInstance.put("/users/" + user._id, updatedDetails);

    dispatch({ type: "DETAILS_UPDATED", payload: updatedDetails });
    window.location.reload();
    // console.log(updatedDetails, "updatedDetails");
    setModal(false);
  };
  return (
    <>
      <form className="form" onSubmit={submit}>
        <h3>Update Your Details</h3>
        <div className="rowAlign">
          <label htmlFor="username">User Name</label>
          <input
            value={updatedDetails.username}
            onChange={handleChange}
            name="username"
            id="username"
            placeholder="username"
          />
        </div>

        <div className="rowAlign">
          <label htmlFor="email">Email</label>
          <input
            value={updatedDetails.email}
            onChange={handleChange}
            name="email"
            id="email"
            placeholder="email"
          />
        </div>

        {/* <div className="rowAlign">
          <label htmlFor="password">Update Password</label>
          <input
            value={updatedDetails.password}
            onChange={handleChange}
            name="password"
            id="password"
            placeholder=" New Password"
          />
        </div> */}
        <div className="rowAlign">
          <label htmlFor="city">City</label>
          <input
            value={updatedDetails.city}
            onChange={handleChange}
            name="city"
            id="city"
            placeholder="city"
          />
        </div>
        <div className="rowAlign">
          <label htmlFor="from">Locality</label>
          <input
            value={updatedDetails.from}
            onChange={handleChange}
            name="from"
            id="from"
            placeholder="locality"
          />
        </div>
        <div className="rowAlign">
          <label htmlFor="relationship">RelationShip</label>
          <select
            placeholder="relationship"
            onChange={handleChange}
            name="relationship"
            id="relationship"
          >
            <option value="1">Single</option>
            <option value="2">InRelationship</option>
            <option value="3">Complex</option>
          </select>
        </div>

        <div className="rowAlign">
          <label htmlFor="desc">Description</label>
          <textarea
            value={updatedDetails.desc}
            onChange={handleChange}
            name="desc"
            id="desc"
            rows="4"
            cols="35"
            placeholder="description"
          />
        </div>
        <div className="rowAlign">
          <button
            type="submit"
            style={{ backgroundColor: "green", color: "white" }}
          >
            submit
          </button>
          <button
            style={{ backgroundColor: "red", color: "white" }}
            onClick={() => setModal(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
