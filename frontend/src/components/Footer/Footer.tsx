import React from "react";
import styled from "styled-components";

const Foot = styled.div`
	display: grid;
	grid-area: footer;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 1fr;
	border-top: 3px solid darkorange;
	background-color: #222;
	height: 10rem;
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
				<div>Request Account</div>
				<div>Site Map</div>
			</FootLeft>
			<FootRight>
				<div>Contact Us</div>
				<div>About Us</div>
				<div>View on Google Maps</div>
			</FootRight>
			<FootBottom>
				<div>Created By Sam Duff for DFZ Service and Repair</div>
				<div>
					View <a href="https://dufferz.net">Dufferz.net</a>
				</div>
			</FootBottom>
		</Foot>
	);
};

export default Footer;
