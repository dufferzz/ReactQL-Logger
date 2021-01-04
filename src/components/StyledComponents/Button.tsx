import styled from "styled-components";

const Button = styled.button`
	padding: 0.5rem 1rem;
	font-size: 1rem;
	margin: 2px;
	width: max-content;
	background: rgb(255, 136, 0);
	background: linear-gradient(
		0deg,
		rgba(255, 136, 0, 1) 0%,
		rgba(250, 166, 52, 1) 100%
	);
	color: #000;
	border-radius: 7px;
	border: 1px solid rgba(0, 0, 0, 0.7);
	outline: none;
	cursor: pointer;
	&:hover {
		background: rgb(255, 168, 62);
		background: linear-gradient(
			180deg,
			rgba(255, 136, 0, 1) 0%,
			rgba(250, 166, 52, 1) 100%
		);
	}
`;

export const DangerButton = styled(Button)`
	background: rgb(255, 8, 0);
	background: linear-gradient(0deg, rgb(255, 0, 0) 0%, rgb(250, 52, 52) 100%);
	&:hover {
		background: rgb(250, 52, 52);
		background: linear-gradient(
			180deg,
			rgb(255, 0, 0) 0%,
			rgb(250, 52, 52) 100%
		);
	}
`;

export const SuccessButton = styled(Button)`
	background: rgb(84, 199, 0);
	background: linear-gradient(
		0deg,
		rgba(84, 199, 0, 1) 0%,
		rgba(120, 232, 48, 1) 100%
	);

	&:hover {
		background: rgb(84, 199, 0);
		background: linear-gradient(
			180deg,
			rgba(84, 199, 0, 1) 0%,
			rgba(120, 232, 48, 1) 100%
		);
	}
`;

export default Button;
