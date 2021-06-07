import { createSlice } from '@reduxjs/toolkit';
import { instance as Axios } from '../../config/axiosConfig';

const coreSlice = createSlice({
	name: 'core',
	initialState: {
		isFetching: false,
		error: false,
		metaData: {},
	},
	reducers: {
		error(state, action) {
			state.error = action.payload;
		},
		toggleFetchingMetadata(state) {
			state.isFetching = !state.isFetching;
		},
		setMetaData(state, action) {
			return action.payload;
		},
	},
});

export const { error, toggleFetchingMetadata, setMetaData } = coreSlice.actions;

export const fetchMeta = () => async (dispatch) => {
	dispatch(toggleFetchingMetadata());
	try {
		const response = await Axios.get('/meta');
		dispatch(
			setMetaData({
				metaData: response.data.results[0],
			})
		);
	} catch (err) {
		dispatch(error(err.toString()));
	}
	dispatch(toggleFetchingMetadata());
};

export default coreSlice.reducer;
