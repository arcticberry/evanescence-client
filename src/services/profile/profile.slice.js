import { createSlice } from "@reduxjs/toolkit";
import { instance as Axios } from "../../config/axiosConfig";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    isFetching: false,
    error: "",
    profile: {},
  },
  reducers: {
    error(state, action) {
      state.error = action.payload;
    },
    toggleProfileFetching(state) {
      state.isFetching = !state.isFetching;
    },
    setProfile(state, action) {
      state.profile = action.payload;
    },
  },
});

export const {
  error,
  toggleProfileFetching,
  setProfile,
} = profileSlice.actions;

export const fetchProfile = () => async (dispatch) => {
  dispatch(toggleProfileFetching());
  try {
    const response = await Axios.get("/profile");

    dispatch(setProfile(response.data.results[0]));

    dispatch(toggleProfileFetching());
  } catch (err) {
    dispatch(error(err.toString()));
    dispatch(toggleProfileFetching());
  }
};

export default profileSlice.reducer;
