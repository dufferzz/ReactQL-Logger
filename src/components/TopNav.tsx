import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Button, { DangerButton } from "./styledComponents/Button";
import Logo from "../assets/logoo.webp";

const Nav = styled.div`
	background-color: #222;
	color: white;
	display: flex;
	height: 5rem;
	align-items: center;
	border-bottom: 3px solid darkorange;
`;

const NavLogo = styled.img`
	height: 4rem;
	margin-left: 0.5rem;
`;

const TopNav = () => {
	const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
	console.log(user);

	const AdminButton = () => {
		let userRole;
		if (user["https://dfzservice.no/roles"]) {
			userRole = user["https://dfzservice.no/roles"][0];
		}
		if (userRole === "admin")
			return (
				<Link to="/admin">
					<DangerButton>Admin Panel</DangerButton>
				</Link>
			);
		return <></>;
	};

	const LoginButton = () => (
		<Button
			style={{ float: "right" }}
			onClick={() => {
				loginWithRedirect();
			}}
		>
			Login
		</Button>
	);
	const LogoutButton = () => (
		<Button
			style={{ float: "right" }}
			onClick={() => {
				logout({ returnTo: window.location.origin });
			}}
		>
			Logout
		</Button>
	);

	return (
		<Nav>
			<Link style={{ textDecoration: "none", color: "inherit" }} to="/">
				<NavLogo src={Logo} />
			</Link>
			<div style={{ width: "100%", textAlign: "right", marginRight: "0.5rem" }}>
				{isAuthenticated ? <LogoutButton /> : <LoginButton />}
				{isAuthenticated && <AdminButton />}
			</div>
		</Nav>
	);
};

export default TopNav;
