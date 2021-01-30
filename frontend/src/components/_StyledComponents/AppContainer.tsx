import styled from "styled-components";

const AppContainer = styled.main`
	grid-area: app;
	background-color: inherit;
	padding-top: 1rem;
	padding-bottom: 1rem;
	margin: 0 auto;
	min-height: 100vh;
	position: relative;

	width: 95%;
	@media (max-width: 580px) {
		width: 96%;
	}
`;

export default AppContainer;
