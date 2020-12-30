import React from "react";
import styled from "styled-components";

const Foot = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 1fr;
	border-top: 3px solid darkorange;
	background-color: #222;
	height: 10rem;
	text-align: center;
	grid-template-areas: "left right" "bottom bottom";
	color: white;
	padding: 0.75rem;
`;
const Footer = () => {
	return (
		<Foot>
			<div style={{ gridArea: "left" }}>
				<div>Request Account</div>
				<div>Site Map</div>
			</div>
			<div style={{ gridArea: "right" }}>
				<div>Contact Us</div>
				<div>About Us</div>
				<div>View on Google Maps</div>
			</div>
			<div style={{ gridArea: "bottom" }}>
				<div>Created By Sam Duff for DFZ Service and Repair</div>
				<div>
					View <a href="https://dufferz.net">Dufferz.net</a>
				</div>
			</div>
		</Foot>
	);
};

export default Footer;
