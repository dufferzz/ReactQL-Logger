import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const StyledIcon = styled(FontAwesomeIcon)`
	filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.5));
	cursor: pointer;
	transition: color 0.2s;
	transition: scale 0.2s ease-in-out;
	&:hover {
		transition: color 0.2s;
		color: orange;
		transform: scale(1.1);
	}
`;
type ToggleButtonProps = {
	isOpen: boolean;
};

const ToggleHideButton = ({ isOpen }: ToggleButtonProps) => {
	return (
		<span style={{ margin: "0.5rem" }}>
			{isOpen ? (
				<StyledIcon icon={faCaretUp} />
			) : (
				<StyledIcon icon={faCaretDown} />
			)}
		</span>
	);
};

export default ToggleHideButton;
