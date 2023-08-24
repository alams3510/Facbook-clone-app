import { enqueueSnackbar } from "notistack";
import axiosInstance from "./services/instance";
const loginCalls = async (userCredentials, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axiosInstance.post("auth/login", userCredentials);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    enqueueSnackbar({
      variant: "success",
      message: "You have Successfully Loged In",
    });
  } catch (error) {
    dispatch({ type: "LOGIN_FAILED", payload: error });
    enqueueSnackbar({
      variant: "error",
      message: "There is something wrong in Email or Password ",
    });
  }
};
export default loginCalls;
