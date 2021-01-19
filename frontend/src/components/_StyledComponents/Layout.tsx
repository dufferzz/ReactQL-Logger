import styled from "styled-components";

const Layout = styled.div`
	display: grid;
	grid-template-rows: 1fr auto;
	grid-template-columns: auto 1fr auto;
	background-color: #ccc;
	background-position: center center;
	background-size: 100%;
	position: relative;
	grid-template-areas:
		"topnav topnav "
		"burger burger"
		"sidebar app "
		"footer footer ";

	@media (max-width: 580px) {
		grid-template-rows: 1fr auto;
		grid-template-columns: 1fr;

		grid-template-areas:
			"topnav"
			"burger"
			"app"
			"footer";
	}
`;

export default Layout;
