import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./utilComponents/LoginButton";
import LogoutButton from "./utilComponents/LogoutButton";
import AdminButton from "./utilComponents/AdminButton";

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

const NavButtons = () => {
	const { isAuthenticated } = useAuth0();
	return (
		<div style={{ width: "100%", textAlign: "right", marginRight: "0.5rem" }}>
			<AdminButton />
			{isAuthenticated ? <LogoutButton /> : <LoginButton />}
		</div>
	);
};

const TopNav = () => {
	return (
		<Nav>
			<Link style={{ textDecoration: "none", color: "inherit" }} to="/">
				<NavLogo src={Logo} />
			</Link>
			<NavButtons />
		</Nav>
	);
};

export default TopNav;
