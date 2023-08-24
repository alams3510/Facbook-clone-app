import { useRef } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import axiosInstance from "../../services/instance";
const Register = () => {
  const navigate = useNavigate();

  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();

  const handlesubmit = async (e) => {
    e.preventDefault();
    let regEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (password.current.value !== passwordAgain.current.value) {
      // passwordAgain.current.setCustomValidity("passwords doesnot matches!");
      return enqueueSnackbar({
        variant: "warning",
        message: "Passwords doesnot matches!",
      });
    } else if (!regEmail.test(email.current.value)) {
      return enqueueSnackbar({
        variant: "warning",
        message: "Please provide valid Email!",
      });
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axiosInstance.post("/auth/register", user);
        enqueueSnackbar({
          variant: "success",
          message: "You have Successfully Registered",
        });
        navigate("/login");
      } catch (error) {
        console.log(error);
        enqueueSnackbar({
          variant: "error",
          message: "Please Provide valid details",
        });
      }
    }
  };

  return (
    <div className="registerContainer">
      <div className="registerWrapper">
        <div className="textRegister">
          <span className="texts">facebook</span>
          <span className="desc">connect with friends and people</span>
        </div>

        <form className="registerform" onSubmit={handlesubmit}>
          <input
            required
            placeholder="UserName"
            ref={username}
            type="text"
            className="registerInput"
          />
          <input
            required
            placeholder="Email"
            ref={email}
            type="email"
            className="registerInput"
          />
          <input
            required
            placeholder="Password"
            minLength="6"
            ref={password}
            type="password"
            className="registerInput"
          />
          <input
            ref={passwordAgain}
            placeholder="Password Again"
            type="password"
            className="registerInput"
          />
          <button className="registerInput" id="signup" type="submit">
            Sign Up
          </button>
          <Link style={{ textAlign: "center" }} to="/login">
            Login if Already have an Account
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
