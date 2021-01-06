import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

import HomePage from "./pages/HomePage/HomePage";
import PartsPage from "./pages/PartsPage/PartsPage";

import SideBar from "./components/SideBar/SideBar";
import TopNav from "./components/TopNav/TopNav";
import Footer from "./components/Footer/Footer";
import NewJob from "./pages/NewJobPage/NewJobPage";
import JobDetails from "./pages/JobDetailsPage/JobDetailsPage";
import Jobs from "./pages/JobsPage/JobsPage";
import NotFound from "./pages/NotFoundPage/NotFoundPage";
import Loading from "./components/Loading/Loading";
import "./App.css";

const AppContainer = styled.div`
	min-height: 80vh;
	background-color: #ddd;
	padding-top: 1rem;
	padding-bottom: 1rem;
	width: 90%;
	margin: auto;
`;

const App = () => {
	const { isLoading } = useAuth0();
	if (isLoading) {
		return (
			<AppContainer>
				<Loading />
			</AppContainer>
		);
	}
	return (
		<Router>
			<TopNav />
			<SideBar />
			<AppContainer>
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route path="/jobs" component={Jobs} />
					<Route path="/parts" component={PartsPage} />
					<Route path="/newjob" component={NewJob} />
					<Route path="/job/:id" component={JobDetails} />
					<Route component={NotFound} />
				</Switch>
			</AppContainer>
			<Footer />
		</Router>
	);
};

export default App;
