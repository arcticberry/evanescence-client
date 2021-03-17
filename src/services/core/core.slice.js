import { createSlice } from "@reduxjs/toolkit";
import { instance as Axios } from "../../config/axiosConfig";

const coreSlice = createSlice({
  name: "core",
  initialState: {
    isFetching: false,
    error: false,
    metaData: [],
  },
  reducers: {
    error(state, action) {
      state.error = action.payload;
    },
    fetchingMetaData(state) {
      state.isFetching = !state.isFetching;
    },
    setMetaData(state, action) {
      return action.payload;
    },
  },
});

export const { error, fetchingMetaData, setMetaData } = coreSlice.actions;

export const fetchMetaData = () => async (dispatch) => {
  dispatch(fetchingMetaData());
  try {
    const response = await Axios.get("/meta");

    dispatch(
      setMetaData({
        metaData: response.data.results,
      })
    );

    // dispatch(fetchingMetaData());
  } catch (err) {
    dispatch(error(err.toString()));
  }
  dispatch(fetchingMetaData());
};

export default coreSlice.reducer;
