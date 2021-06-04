// in HTTP.js
import axios from 'axios';
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';

// create a new axios instance
export const instance = axios.create({
	// baseURL: process.env.REACT_APP_API_BASE_URL,
	headers: {
		Authorization: JSON.parse(localStorage.getItem('token'))
			? `Bearer ${JSON.parse(localStorage.getItem('token')).token}`
			: '',
	},
});

instance.interceptors.request.use((config) => {
	Nprogress.start();
	return config;
});

instance.interceptors.response.use(
	(response) => {
		Nprogress.done();
		return response;
	},
	function (error) {
		Nprogress.done();
		if (!error.response || !error.response.data || !error.response.data.message) {
			error = {
				response: {
					data: {
						message: 'Unable to complete request',
					},
				},
			};
		}
		throw error;
	}
);
