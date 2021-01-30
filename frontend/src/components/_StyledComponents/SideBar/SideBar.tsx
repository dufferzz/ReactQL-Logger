import React from "react";

import styled from "styled-components";

import { BurgerDropDown } from "../BurgerMenu";

import config from "../../../config/config";

const StyledSideBar = styled.div`
	grid-area: sidebar;
	text-align: center;
	width: 200px;
	background: rgba(195, 195, 195, 1);
	background: linear-gradient(
		90deg,
		rgba(195, 195, 195, 1) 0%,
		rgba(218, 218, 218, 1) 100%
	);
	box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.4);
	@media (max-width: ${config.mobileBreakpoint}px) {
		display: none;
	}
`;

const SideBar = () => {
	return (
		<StyledSideBar>
			<BurgerDropDown />
		</StyledSideBar>
	);
};

export default SideBar;
