import authSlice from "./authData.js";
import jobSlice from "./jobs";
import { combineReducers } from "redux";
const r = {
	authSlice: authSlice,
	jobSlice: jobSlice,
};

const combinedReducers = combineReducers(r);

export default combinedReducers;
