import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "../../components/_StyledComponents/Button";
import styled from "styled-components";

import BackgroundImage from "../../assets/images/forest.webp";

const Background = styled.div`
	text-align: center;
	width: 100%;
	height: 100%;
	background-image: url(${BackgroundImage});
	background-position: center center;
	background-size: 100%;
	color: white;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const HomePage = () => {
	const { loginWithRedirect } = useAuth0();

	return (
		<Background>
			<div
				style={{
					borderRadius: "10px",
					backgroundColor: "rgba(0,0,0,0.7)",
					width: "fit-content",
					padding: "1rem",
					boxShadow: "0 0 7px rgba(0,0,0,0.7)",
				}}
			>
				<div style={{ fontSize: "1.3rem" }}>
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
			</div>
		</Background>
	);
};

export default HomePage;
