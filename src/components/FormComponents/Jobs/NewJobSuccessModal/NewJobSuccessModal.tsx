import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../StyledComponents/Button";

const NewJobSuccessModal = ({ data }: any) => {
	return (
		<div>
			{data.addJob._id} Has been added!
			<Link to={`/job/${data.addJob._id}`}>
				<Button>View now!</Button>
			</Link>
		</div>
	);
};

export default NewJobSuccessModal;
