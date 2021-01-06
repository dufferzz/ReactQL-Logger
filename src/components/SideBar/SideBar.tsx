import React from "react";
import Button from "../StyledComponents/Button";
import { Link } from "react-router-dom";
const SideBar = () => {
	return (
		<div>
			<Link to="/parts">
				<Button>Parts Mangement</Button>
			</Link>
		</div>
	);
};

export default SideBar;
