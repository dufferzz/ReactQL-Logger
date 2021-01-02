import React from "react";
import styled from "styled-components";

const SubmitButton = styled.button`
	width: 100%;
	display: block;
	background-color: rgba(0, 200, 0, 0.7);
	border: 1px solid #aaa;
	border-radius: 5px;
	font-size: 1rem;
	padding: 0.7rem;
	outline: none;
	&:hover {
		box-shadow: 0 0 7px rgba(137, 195, 235, 1);
		border: 1px solid rgba(137, 195, 235, 1);
		transition: box-shadow 0.2s;
		cursor: pointer;
	}
`;
const SubmitFormButton = ({ isSubmitting }: any) => (
	<SubmitButton type="submit" disabled={isSubmitting}>
		Save Job
	</SubmitButton>
);

export default SubmitFormButton;
