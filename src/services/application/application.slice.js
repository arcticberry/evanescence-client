import { createSlice } from '@reduxjs/toolkit';
import { instance as Axios } from '../../config/axiosConfig';
import { toast } from 'react-toastify';

const applicationSlice = createSlice({
	name: 'application',
	initialState: {
		isCreatingApplication: false,
		isFetchingApplications: false,
		isFetchingApplication: false,
		error: '',
		applications: [],
		application: {},
	},
	reducers: {
		applicationCreationFailure(state, action) {
			state.error = action.payload;
		},
		toggleApplicationCreation(state) {
			state.isCreatingApplication = !state.isCreatingApplication;
		},

		applicationFetchingFailure(state, action) {
			state.error = action.payload;
		},
		toggleApplicationsFetching(state) {
			state.isCreatingApplication = !state.isCreatingApplication;
		},

		setApplications(state, action) {
			state.applications = action.payload;
		},
		setApplication(state, action) {
			state.application = action.payload;
		},
	},
});

export const {
	applicationCreationFailure,
	applicationsFetchingFailure,
	toggleApplicationCreation,
	toggleApplicationsFetching,
	setApplications,
	setApplication,
} = applicationSlice.actions;

export const createApplication = (payload, history) => async (dispatch) => {
	dispatch(toggleApplicationCreation());

	try {
		const response = await Axios.post('/applications', payload);
		toast.success(response.data.message);
		history.push('/account/applications');
	} catch (err) {
		dispatch(applicationCreationFailure(err.toString()));
		toast.error(err.response.data.message, {
			position: 'top-right',
			autoClose: 5000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	}
	dispatch(toggleApplicationCreation());
};

export const fetchApplications = () => async (dispatch) => {
	dispatch(toggleApplicationsFetching());

	try {
		const response = await Axios.get('/applications');

		// const normalized = normalize(response.data.results, [applicationsSchema]);

		// console.log(normalized);

		dispatch(setApplications(response.data.results));

		dispatch(toggleApplicationsFetching());
	} catch (error) {
		dispatch(applicationsFetchingFailure(error.toString()));
	}
};

export const fetchApplication = (history, { params: { application_id } }) => async (dispatch) => {
	dispatch(toggleApplicationsFetching());
	try {
		const response = await Axios.get(`/applications/${application_id}`);

		// const normalized = normalize(response.data.results[0], applicationSchema);

		dispatch(setApplication(response.data.results[0]));

		dispatch(toggleApplicationsFetching());
	} catch (error) {
		dispatch(applicationCreationFailure(error.toString()));
	}
};

export const toggleApplicationStatus = (application_id, payload) => async (dispatch) => {
	try {
		await Axios.put(`/applications/${application_id}`, payload);
		dispatch(toggleApplicationsFetching());
	} catch (error) {
		dispatch(applicationCreationFailure(error.toString()));
	}
};

export const controlAppServiceActivation = (application_id, service_id, payload) => async (dispatch) => {
	try {
		await Axios.patch(`/service/activate/${application_id}/${service_id}`, payload);
		dispatch(toggleApplicationsFetching());
	} catch (error) {
		dispatch(applicationCreationFailure(error.toString()));
	}
};

export default applicationSlice.reducer;
