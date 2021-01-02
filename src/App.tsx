import "./App.css";
import TopNav from "./components/TopNav";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import NewJob from "./pages/NewJobPage";
import JobDetails from "./pages/JobDetailsPage";
import Jobs from "./pages/JobsPage";
import NotFound from "./pages/NotFoundPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Loading from "./components/Loading";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
	const { isLoading } = useAuth0();
	if (isLoading) {
		return (
			<div style={{ width: "100vw", height: "100vh" }}>
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
}

export default App;
