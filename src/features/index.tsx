import authSlice from "./authData";
import { combineReducers } from "redux";
const r = {
	authSlice: authSlice,
};

const combinedReducers = combineReducers(r);

export default combinedReducers;
