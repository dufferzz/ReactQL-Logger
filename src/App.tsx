import "./App.css";
import TopNav from "./components/TopNav/TopNav";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import NewJob from "./pages/NewJobPage/NewJobPage";
import JobDetails from "./pages/JobDetailsPage/JobDetailsPage";
import Jobs from "./pages/JobsPage/JobsPage";
import NotFound from "./pages/NotFoundPage/NotFoundPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Loading from "./components/Loading/Loading";
import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
	const { isLoading } = useAuth0();
	if (isLoading) {
		return (
			<div className="App">
				<Loading />
			</div>
		);
	}
	return (
		<Router>
			<TopNav />
			<div className="App">
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route path="/jobs" component={Jobs} />
					<Route path="/newjob" component={NewJob} />
					<Route path="/job/:id" component={JobDetails} />
					<Route component={NotFound} />
				</Switch>
			</div>
			<Footer />
		</Router>
	);
};

export default App;
