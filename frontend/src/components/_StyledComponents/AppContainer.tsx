import styled from "styled-components";

const AppContainer = styled.main`
	grid-area: app;
	background-color: inherit;
	padding-top: 1rem;
	padding-bottom: 1rem;
	margin: 0 auto;
	min-height: 75vh;
	width: 95%;
	@media (max-width: 580px) {
		width: 98%;
	}
`;

export default AppContainer;
