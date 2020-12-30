import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { doLogin, doLogout } from "../features/authData";

import Logo from "../assets/logoo.webp";

const Nav = styled.div`
	background-color: #333;
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
	const authSlice = useSelector((state) => state.authSlice);
	const dispatch = useDispatch();
	const LoginButton = () => (
		<button
			style={{ float: "right" }}
			onClick={() => {
				dispatch(doLogin());
			}}
		>
			Login
		</button>
	);
	const LogoutButton = () => (
		<button
			style={{ float: "right" }}
			onClick={() => {
				dispatch(doLogout());
			}}
		>
			Logout
		</button>
	);

	return (
		<Nav>
			<Link style={{ textDecoration: "none", color: "inherit" }} to="/">
				<NavLogo src={Logo} />
			</Link>
			<div style={{ width: "100%", textAlign: "right", marginRight: "0.5rem" }}>
				{authSlice.isLoggedIn ? <LogoutButton /> : <LoginButton />}
			</div>
		</Nav>
	);
};

export default TopNav;
