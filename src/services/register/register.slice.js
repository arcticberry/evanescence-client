import { createSlice } from "@reduxjs/toolkit";
import { instance as Axios } from "config/axiosConfig";
import { toast } from "react-toastify";

const registerSlice = createSlice({
  name: "register",
  initialState: {
    isCreatingUser: false,
    error: "",
  },
  reducers: {
    userCreationFailure(state, action) {
      state.error = action.payload;
    },
    toggleUserCreation(state) {
      state.isCreatingUser = !state.isCreatingUser;
    },
    setVisibilityFilter(state, action) {
      return action.payload;
    },
  },
});

export const {
  userCreationFailure,
  toggleUserCreation,
} = registerSlice.actions;

export const createUser = (
  { email, password, businessName, countryId, phone },
  history
) => async (dispatch) => {
  const data = {
    business_name: businessName,
    email,
    password,
    phone,
    phone_country_id: countryId,
  };
  dispatch(toggleUserCreation());
  try {
    const response = await Axios.post("/accounts", data);
    toast.success(response.data.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    history.push("/login");
  } catch (err) {
    dispatch(userCreationFailure(err.toString()));
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
  dispatch(toggleUserCreation());
};

export const signupWithGoogle = (history) => async (dispatch) => {
  dispatch(toggleUserCreation());
  try {
    const response = await Axios.get("/auth/google");

    const width = 500;
    const height = 500;

    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2.5;

    const windowFeatures = `toolbar=0,scrollbars=1,status=1,resizable=0,location=1,menuBar=0,width=${width},height=${height},top=${top},left=${left}`;

    var newWindow = window.open(
      response.data.results[0].redirect_url,
      "Evanescence",
      windowFeatures
    );
    if (window.focus) {
      newWindow.focus();
    }
    // toast.success(response.data.message, {
    //   position: "top-right",
    //   autoClose: 5000,
    //   hideProgressBar: true,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    // });
    // history.push("/login");
  } catch (err) {
    dispatch(userCreationFailure(err.toString()));
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
  dispatch(toggleUserCreation());
};

export default registerSlice.reducer;
