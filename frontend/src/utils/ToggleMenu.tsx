import { useReducer } from "react";

// Hook
const useToggle = (initialValue = false) => {
	return useReducer((state) => !state, initialValue);
};

export default useToggle;
