import { createSlice } from '@reduxjs/toolkit';

const applicationSlice = createSlice({
	name: 'application',
	initialState: {
		selectedApplication: null,
	},
	reducers: {
		setSelectedApplication(state, action) {
			const { selectedApplication } = action.payload;
			state.selectedApplication = selectedApplication;
		},
	},
});

export const { setSelectedApplication } = applicationSlice.actions;

export default applicationSlice.reducer;
