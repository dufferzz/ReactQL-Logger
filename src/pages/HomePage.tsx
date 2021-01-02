import React from "react";
import Jobs from "./JobsPage";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "../components/styledComponents/Button";
import Section from "../components/styledComponents/Section";

const Home = () => {
	const { loginWithRedirect } = useAuth0();

	return (
		<Section style={{ textAlign: "center" }}>
			<div style={{ margin: "1rem", fontSize: "1.3rem" }}>
				Welcome to DFZ Service and Repair Administration!
				<br />
				<div style={{ margin: "1rem" }}>You are not logged in!</div>
			</div>
			<div style={{ margin: "1rem", fontSize: "1.1rem" }}>
				Already Registered?
			</div>
			<div>
				<Button onClick={() => loginWithRedirect()}>Log in now</Button>
			</div>
			<div style={{ fontSize: "1.1rem", margin: "1rem" }}>
				Don't have an account?
			</div>
			<div>
				<Button
					onClick={() =>
						loginWithRedirect({
							screen_hint: "signup",
						})
					}
				>
					Create an account
				</Button>
			</div>
		</Section>
	);
};

const HomePage = () => {
	const { isAuthenticated } = useAuth0();

	return <>{!isAuthenticated ? <Home /> : <Jobs />}</>;
};

export default HomePage;
