import "./login.css";
import { useRef } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import loginCalls from "../../apiCalls";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

const Login = () => {
  const { user, isFetching, dispatch } = useContext(AuthContext);
  const email = useRef();
  const password = useRef();

  const handleclick = (e) => {
    e.preventDefault();
    loginCalls(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  // console.log(user);

  const navigate = useNavigate();
  return (
    <div className="registerContainer">
      <div className="registerWrapper">
        <div className="textRegister">
          <span className="texts">facebook</span>
          <span className="desc">connect with friends and people</span>
        </div>

        <form className="registerform" onSubmit={handleclick}>
          <input
            ref={email}
            required
            placeholder="Email"
            type="email"
            className="registerInputs"
          />
          <input
            required
            ref={password}
            minLength="6"
            placeholder="Password"
            type="password"
            className="registerInputs"
          />
          <button
            type="submit"
            disabled={isFetching}
            className="registerInputs"
            id="signup"
          >
            {isFetching ? "loading..." : "Log In"}
          </button>

          <span className="link">Forgot Password</span>

          <button
            style={{
              fontSize: "15px",
              border: "none",
              outline: "none",
              padding: "5px 10px",
            }}
            id="loginto"
            onClick={() => navigate("/register")}
          >
            Create a New account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
