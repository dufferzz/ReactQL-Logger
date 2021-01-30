import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../_SharedComponents/Buttons/LoginButton";
import LogoutButton from "../_SharedComponents/Buttons/LogoutButton";
import AdminButton from "../_SharedComponents/Buttons/AdminButton";
import config from "../../config/config";

import Logo from "../../assets/images/logoo.webp";

import useWindowSize from "../../utils/useWindowSize";
import Button from "../_StyledComponents/Button";

const Nav = styled.div`
	grid-area: topnav;
	background-color: #222;
	color: white;
	display: grid;
	grid-template-columns: auto 1fr;
	grid-template-rows: 3fr auto;

	grid-template-areas: "logo buttons" "user buttons";

	/* height: 100%; */
	position: relative;
	padding: 0.5rem;
	align-items: center;
	border-bottom: 3px solid darkorange;
	z-index: 11100;
`;

const NavLogo = styled.img`
	grid-area: logo;
	height: 4rem;
	/* margin-left: 0.5rem; */
`;

const NavBarButtons = styled.div`
	grid-area: buttons;
	/* width: 100%; */
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
	const { isAuthenticated } = useAuth0();
	return (
		<NavBarButtons>
			{isAuthenticated && (
				<Button
					style={{ fontSize: "1.5rem" }}
					onClick={() => {
						setBurgerMenuOpen(!menuState);
					}}
				>
					≡
				</Button>
			)}
		</NavBarButtons>
	);
};

const ShowUser = () => {
	const { width } = useWindowSize();

	const { user, isAuthenticated } = useAuth0();

	return (
		<div>
			{isAuthenticated && user && width < config.mobileBreakpoint && (
				<div style={{ gridArea: "user" }}>{user.email}</div>
			)}
		</div>
	);
};

const TopNav = ({ setBurgerMenuOpen, burgerMenuOpen }: any) => {
	const { width } = useWindowSize();

	return (
		<Nav>
			<NavLink style={{ textDecoration: "none", color: "inherit" }} to="/">
				<NavLogo alt="Logo" src={Logo} />
			</NavLink>
			{width > config.mobileBreakpoint ? (
				<NavButtons />
			) : (
				<BurgerMenu
					menuState={burgerMenuOpen}
					setBurgerMenuOpen={setBurgerMenuOpen}
				/>
			)}
			{/* <ShowUser /> */}
		</Nav>
	);
};

export default TopNav;
