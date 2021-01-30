import React from "react";
import styled from "styled-components";

import theme from "../../config/theme";

const Foot = styled.div`
	display: grid;
	grid-area: footer;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 1fr;
	border-top: 3px solid ${theme.accentColor};
	background: ${theme.headerFooter};
	height: 5rem;
	line-height: 1.7;
	text-align: center;
	grid-template-areas: "left right" "bottom bottom";
	color: white;
	padding: 0.75rem;
`;

const FootLeft = styled.div`
	grid-area: left;
`;

const FootRight = styled.div`
	grid-area: right;
`;
const FootBottom = styled.div`
	grid-area: bottom;
`;

const Footer = () => {
	return (
		<Foot>
			<FootLeft>
				<div>
					<a href="mailto:dufferz@dufferz.net?subject='Account%20Request%20-%20DFZ%20Admin'">
						Request Account
					</a>
				</div>
				<div>
					<a href="mailto:dufferz@dufferz.net">Contact an Admin</a>
				</div>
			</FootLeft>
			<FootRight>
				<div title="Incomplete Section">Site Map</div>
				<div title="Incomplete Section">About this App</div>
			</FootRight>
			<FootBottom>
				<div>
					Created By Sam Duff @ <a href="https://dufferz.net">Dufferz.net</a>
				</div>
			</FootBottom>
		</Foot>
	);
};

export default Footer;
