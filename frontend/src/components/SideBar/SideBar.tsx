import React from "react";
import Button from "../StyledComponents/Button";
import { Link } from "react-router-dom";
import FlexDiv from "../StyledComponents/FlexDiv";
const SideBar = () => {
	return (
		<FlexDiv style={{ marginTop: "0.7rem" }}>
			<Link to="/parts">
				<Button>Parts Management</Button>
			</Link>
		</FlexDiv>
	);
};

export default SideBar;
