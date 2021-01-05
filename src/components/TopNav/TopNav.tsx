import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../SharedComponents/LoginButton";
import LogoutButton from "../SharedComponents/LogoutButton";
import AdminButton from "../SharedComponents/AdminButton";

import Logo from "../../assets/logoo.webp";

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

const NavBarButtons = styled.div`
	width: 100%;
	text-align: right;
	margin-right: 0.5rem;
`;

const NavButtons = () => {
	const { isAuthenticated } = useAuth0();
	return (
		<NavBarButtons>
			<AdminButton />
			{isAuthenticated ? <LogoutButton /> : <LoginButton />}
		</NavBarButtons>
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
