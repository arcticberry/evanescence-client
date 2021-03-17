import { createSlice } from "@reduxjs/toolkit";
import { instance as Axios } from "../../config/axiosConfig";
import { toast } from "react-toastify";

const loginSlice = createSlice({
  name: "register",
  initialState: {
    isloggingIn: false,
    error: "",
  },
  reducers: {
    loginFailure(state, action) {
      state.error = action.payload;
    },
    toggleLoggingIn(state) {
      state.isloggingIn = !state.isloggingIn;
    },
  },
});

export const { loginFailure, toggleLoggingIn } = loginSlice.actions;

export const loginUser = ({ uid, password }, history) => async (dispatch) => {
  dispatch(toggleLoggingIn());
  try {
    const apiRequest = {
      uid,
      password,
    };
    const { data } = await Axios.post("/accounts/login", apiRequest);
    localStorage.setItem("token", JSON.stringify(data.results[0].token));
    Axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${data.results[0].token.token}`;

    toast.success(data.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    window.location.assign("/dashboard");
  } catch (err) {
    dispatch(loginFailure(err.toString()));
    toast.error(err.response.data.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  dispatch(toggleLoggingIn());
};

export default loginSlice.reducer;
