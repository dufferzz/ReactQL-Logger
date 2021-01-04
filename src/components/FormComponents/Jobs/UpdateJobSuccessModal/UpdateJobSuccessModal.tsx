import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../StyledComponents/Button";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
const UpdateJobSuccessModal = ({ errors, isSubmitting }: any) => {
	console.log(errors, isSubmitting);
	if (isSubmitting) {
		MySwal.fire({
			title: <p>Success!</p>,
			icon: "success",
			text: "Job Saved successfully.",
		});
	}
	return <></>;
};

export default UpdateJobSuccessModal;
