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
			uid,
			password,
		};
		const { data } = await Axios.post('/auth/login', apiRequest);

		localStorage.setItem('token', JSON.stringify(data.results[0].token));
		Axios.defaults.headers.common['Authorization'] = `Bearer ${data.results[0].token.token}`;

		toast.success(data.message);

		window.location.assign('/dashboard');
	} catch (err) {
		dispatch(loginFailure(err.toString()));
		toast.error(err.response.data.message);
	}
	dispatch(toggleLoginRequest());
};

export default loginSlice.reducer;
