import "./App.css";
import TopNav from "./components/TopNav";
import Footer from "./components/Footer";
import Home from "./pages/HomePage";
import NewJob from "./pages/NewJobPage";
import JobDetails from "./pages/JobDetailsPage";
import Jobs from "./pages/JobsPage";
import NotFound from "./pages/NotFoundPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
	return (
		<Router>
			<TopNav />
			<div className="App">
				<Switch>
					<Route exact path="/" component={Home} />
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
