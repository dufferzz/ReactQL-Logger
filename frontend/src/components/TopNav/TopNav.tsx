import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../SharedComponents/LoginButton";
import LogoutButton from "../SharedComponents/LogoutButton";
import AdminButton from "../SharedComponents/AdminButton";

import Logo from "../../assets/images/logoo.webp";

import useWindowSize from "../../utils/useWindowSize";
import Button from "../StyledComponents/Button";

const Nav = styled.div`
	grid-area: topnav;
	background-color: #222;
	color: white;
	display: flex;
	height: 100%;
	position: relative;
	padding: 0.2rem;
	align-items: center;
	border-bottom: 3px solid darkorange;
	z-index: 11100;
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

const BurgerMenu = ({ setBurgerMenuOpen, menuState }: any) => {
	return (
		<NavBarButtons>
			<Button
				style={{ fontSize: "1.5rem" }}
				onClick={() => {
					setBurgerMenuOpen(!menuState);
				}}
			>
				≡
			</Button>
		</NavBarButtons>
	);
};

const TopNav = ({ setBurgerMenuOpen, burgerMenuOpen }: any) => {
	const { width } = useWindowSize();
	return (
		<Nav>
			<Link style={{ textDecoration: "none", color: "inherit" }} to="/">
				<NavLogo alt="Logo" src={Logo} />
			</Link>
			{width >= 580 ? (
				<NavButtons />
			) : (
				<BurgerMenu
					menuState={burgerMenuOpen}
					setBurgerMenuOpen={setBurgerMenuOpen}
				/>
			)}
		</Nav>
	);
};

export default TopNav;
