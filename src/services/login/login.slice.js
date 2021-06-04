import { createSlice } from '@reduxjs/toolkit';
import { instance as Axios } from '../../config/axiosConfig';
import { toast } from 'react-toastify';

const loginSlice = createSlice({
	name: 'login',
	initialState: {
		isPerformingLogin: false,
		error: '',
	},
	reducers: {
		loginFailure(state, action) {
			state.error = action.payload;
		},
		toggleLoginRequest(state) {
			state.isPerformingLogin = !state.isPerformingLogin;
		},
	},
});

export const { loginFailure, toggleLoginRequest } = loginSlice.actions;

export const loginUser = ({ uid, password }) => async (dispatch) => {
	dispatch(toggleLoginRequest());

	try {
		const apiRequest = {
			email: uid,
			password,
		};
		const { data } = await Axios.post('/auth/login', apiRequest);

		toast.success(data.message);

		window.location.push('/dashboard');
	} catch (err) {
		dispatch(loginFailure(err.toString()));
		toast.error(err.response.data.message);
	}
	dispatch(toggleLoginRequest());
};

export default loginSlice.reducer;
