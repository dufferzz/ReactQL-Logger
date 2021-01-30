import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Loading from "./components/_SharedComponents/Loading/Loading";
import ErrorBoundary from "./components/_SharedComponents/ErrorBoundary/ErrorBoundary";
import ScrollToTop from "./utils/ScrollToTop";

import SideBar from "./components/_StyledComponents/SideBar/SideBar";
import TopNav from "./components/TopNav/TopNav";
import AppContainer from "./components/_StyledComponents/AppContainer";
import Layout from "./components/_StyledComponents/Layout";
import {
	BurgerDropDown,
	Shadow,
} from "./components/_StyledComponents/BurgerMenu";
import Footer from "./components/Footer/Footer";

import HomePage from "./pages/HomePage/HomePage";
import PartsPage from "./pages/PartsPage/PartsPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import AdminPage from "./pages/AdminPage/AdminPage";

import UserDetails from "./pages/AdminPage/Users/UserDetails";
import PartDetailsPage from "./pages/PartDetailsPage/PartDetailsPage";
import NewJob from "./pages/NewJobPage/NewJobPage";
import JobDetails from "./pages/JobDetailsPage/JobDetailsPage";
import JobsPage from "./pages/JobsPage/JobsPage";
import MessagesPage from "./pages/MessagesPage/MessagesPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import AddPartPage from "./pages/AddPartPage/AddPartPage";

import useWindowSize from "./utils/useWindowSize";

import "./App.css";

const routes = [
	{ path: "/", name: "Home", Component: JobsPage },
	{ path: "/jobs", name: "Jobs", Component: JobsPage },
	{ path: "/newjob", name: "New Job", Component: NewJob },
	{ path: "/job/:id", name: "Job Details", Component: JobDetails },
	{ path: "/parts", name: "Parts", Component: PartsPage },
	{ path: "/newpart", name: "Add Part", Component: AddPartPage },

	{ path: "/part/:id", name: "Part Details", Component: PartDetailsPage },
	{ path: "/messages", name: "Messages", Component: MessagesPage },
	{ path: "/settings", name: "Settings", Component: SettingsPage },
	{ path: "/admin", name: "Administration", Component: AdminPage },
	{ path: "/admin/users/:id", name: "User Management", Component: UserDetails },

	{ path: "/search", name: "Search", Component: SearchPage },
	{ path: "/search/:id", name: "Search", Component: SearchPage },
];

const App = () => {
	const { width } = useWindowSize();

	const { isLoading, isAuthenticated } = useAuth0();
	const [burgerMenuOpen, setBurgerMenuOpen] = useState<boolean>(false);

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
				<TopNav
					burgerMenuOpen={burgerMenuOpen}
					setBurgerMenuOpen={setBurgerMenuOpen}
				/>

				<main style={{ height: "85vh" }}>
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
				{burgerMenuOpen && width < 1024 && (
					<>
						<div
							onClick={() => {
								setBurgerMenuOpen(false);
							}}
							style={{
								animation: "fadeIn",
								position: "absolute",
								top: "6.5rem",
								left: 0,
								zIndex: 10000,
							}}
						>
							<BurgerDropDown
								style={{ width: "250px", minHeight: "100%" }}
								setBurgerMenuOpen={setBurgerMenuOpen}
								burgerMenuOpen={burgerMenuOpen}
							/>
						</div>
					</>
				)}
				<SideBar />
				<AppContainer>
					<ErrorBoundary>
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

							<Route component={NotFoundPage} />
						</Switch>
						{burgerMenuOpen && (
							<Shadow
								onClick={() => {
									setBurgerMenuOpen(false);
								}}
							/>
						)}
					</ErrorBoundary>
				</AppContainer>
				<Footer />
			</Router>
		</Layout>
	);
};

export default App;
