import styled from "styled-components";

const Section = styled.div`
	grid-area: content;
	border: 1px solid #aaa;
	padding: 1rem;
	border-radius: 10px;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
	grid-gap: 0.25rem;
	margin: 0 0 1.5rem 0;
	background-color: #eee;
	@media (max-width: 580px) {
		padding: 0.5rem;
	}
`;
export default Section;
