import styled from "styled-components";

const Button = styled.button`
	background: rgb(255, 140, 0);
	background: linear-gradient(
		0deg,
		rgba(255, 140, 0, 1) 0%,
		rgb(255, 168, 62) 100%
	);
	color: black;
	padding: 0.5rem 1.5rem;
	border: 1px solid black;
	border-radius: 7px;
	font-size: 1rem;
	&:hover {
		background: rgb(255, 168, 62);
		background: linear-gradient(
			0deg,
			rgb(255, 168, 62) 0%,
			rgba(255, 140, 0, 1) 100%
		);
	}
`;

export default Button;
