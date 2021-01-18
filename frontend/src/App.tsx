import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

import HomePage from "./pages/HomePage/HomePage";
import PartsPage from "./pages/PartsPage/PartsPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import PartDetailsPage from "./pages/PartDetailsPage/PartDetailsPage";
import SideBar from "./components/SideBar/SideBar";
import TopNav from "./components/TopNav/TopNav";
import Footer from "./components/Footer/Footer";
import NewJob from "./pages/NewJobPage/NewJobPage";
import JobDetails from "./pages/JobDetailsPage/JobDetailsPage";
import Jobs from "./pages/JobsPage/JobsPage";
import MessagesPage from "./pages/MessagesPage/MessagesPage";
import NotFound from "./pages/NotFoundPage/NotFoundPage";
import Loading from "./components/_SharedComponents/_Loading/Loading";
import ErrorBoundary from "./components/_SharedComponents/_ErrorBoundary/ErrorBoundary";
import ScrollToTop from "./utils/ScrollToTop";
import "./App.css";

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

const routes = [
	{ path: "/", name: "Home", Component: Jobs },
	{ path: "/jobs", name: "Jobs", Component: Jobs },
	{ path: "/newjob", name: "New Job", Component: NewJob },
	{ path: "/job/:id", name: "Job Details", Component: JobDetails },
	{ path: "/parts", name: "Parts", Component: PartsPage },
	{ path: "/part/:id", name: "Part Details", Component: PartDetailsPage },
	{ path: "/messages", name: "Messages", Component: MessagesPage },
	{ path: "/settings", name: "Settings", Component: SettingsPage },
	{ path: "/admin", name: "Administration", Component: AdminPage },
	{ path: "/search", name: "Search", Component: SearchPage },
];

const BurgerDropDownView = styled.div`
	position: absolute;
	width: 100%;
	grid-area: burger;
	margin-top: 0.5rem;
	top: 5px;
	left: 0;
	display: block;
	background-color: rgba(200, 200, 200, 0.9);
	z-index: 100000;
	box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
	border-radius: 0 0 10px 10px;
`;

const BurgerDropDownItemView = styled.div`
	color: black;
	text-align: center;
	margin: 0.25rem;
	line-height: 2;
	&:hover {
		background-color: rgba(0, 0, 0, 0.1);
		border-radius: 5px;
	}
`;

const BurgerMenuItem = ({ to, text }: any) => (
	<Link to={to}>
		<BurgerDropDownItemView>{text}</BurgerDropDownItemView>
	</Link>
);

const BurgerDropDown = ({ burgerMenuOpen, setBurgerMenuOpen }: any) => {
	return (
		<>
			{burgerMenuOpen && (
				<BurgerDropDownView>
					<div
						onClick={() => {
							setBurgerMenuOpen(false);
						}}
					>
						<BurgerMenuItem to="/" text="Home" />
						<BurgerMenuItem to="/search" text="Search" />
						<BurgerMenuItem to="/parts" text="Parts" />
						<BurgerMenuItem to="/messages" text="Messages" />
						<BurgerMenuItem to="/admin" text="Admin" />
						<BurgerMenuItem to="/settings" text="Settings" />
						<BurgerMenuItem to="/logout" text="Logout" />
					</div>
				</BurgerDropDownView>
			)}
		</>
	);
};

const App = () => {
	const { isLoading, isAuthenticated } = useAuth0();
	const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);

	if (isLoading) {
		return (
			<Layout>
				<Router>
					<TopNav />
					<AppContainer>
						<ErrorBoundary>
							<Loading />
						</ErrorBoundary>
					</AppContainer>
					<Footer />
				</Router>
			</Layout>
		);
	}
	if (!isLoading && !isAuthenticated) {
		return (
			<Router>
				<TopNav />
				<main style={{ height: "75vh" }}>
					<HomePage />
				</main>
				<Footer />
			</Router>
		);
	}

	return (
		<Layout>
			<Router>
				<ScrollToTop />
				<TopNav
					burgerMenuOpen={burgerMenuOpen}
					setBurgerMenuOpen={setBurgerMenuOpen}
				/>
				<BurgerDropDown
					setBurgerMenuOpen={setBurgerMenuOpen}
					burgerMenuOpen={burgerMenuOpen}
				/>{" "}
				<SideBar />
				<ErrorBoundary>
					<AppContainer>
						<Switch>
							{routes.map((route: any) => (
								<Route
									key={route.path}
									exact
									path={route.path}
									name={route.name}
									component={route.Component}
								/>
							))}

							<Route component={NotFound} />
						</Switch>
					</AppContainer>
				</ErrorBoundary>
				<Footer />
			</Router>
		</Layout>
	);
};

export default App;
