import "./App.css";
import TopNav from "./components/TopNav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import NewJob from "./pages/NewJob";
import JobDetails from "./pages/JobDetails";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
	return (
		<Router>
			<TopNav />
			<div className="App">
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route path="/newjob">
						<NewJob />
					</Route>
					<Route path="/job/:id">
						<JobDetails />
					</Route>
				</Switch>
			</div>
			<Footer />
		</Router>
	);
}

export default App;
