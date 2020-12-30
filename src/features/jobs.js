import { createSlice } from "@reduxjs/toolkit";
const initialState = [];

const jobSlice = createSlice({
	name: "JobSlice",
	initialState: initialState,
	reducers: {
		storeAllJobs(state, action) {
			state = action.payload;
		},
		appendNewJob(state, action) {
			state.push(action.payload);
		},
		deleteJob(state, action) {
			// state.push(action.payload);
			// state.find( id )
		},
	},
});

export const { doLogin, doLogout } = jobSlice.actions;

export default jobSlice.reducer;
