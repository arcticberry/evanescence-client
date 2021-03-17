import { createSlice } from "@reduxjs/toolkit";
import { instance as Axios } from "../../config/axiosConfig";

import { map } from "lodash";
import { normalize } from "normalizr";
import serviceSchema from "./services";

const serviceSlice = createSlice({
  name: "service",
  initialState: {
    isFetching: false,
    error: "",
    services: {},
  },
  reducers: {
    error(state, action) {
      state.error = action.payload;
    },
    toggleServicesFetching(state) {
      state.isFetching = !state.isFetching;
    },
    setServices(state, action) {
      state.services = action.payload;
    },
  },
});

export const {
  error,
  toggleServicesFetching,
  setServices,
} = serviceSlice.actions;

export const fetchServices = () => async (dispatch) => {
  dispatch(toggleServicesFetching());
  try {
    const response = await Axios.get("/services");

    const normalized = normalize(response.data.results, serviceSchema);

    dispatch(setServices(normalized));

    dispatch(toggleServicesFetching());
  } catch (err) {
    console.log(err, "err");
    dispatch(error(err.toString()));
  }
};

export default serviceSlice.reducer;
