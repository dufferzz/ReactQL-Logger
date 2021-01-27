import styled from "styled-components";
import { Link } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";

const BurgerDropDownView = styled.div`
	position: absolute;
	width: 100%;
	grid-area: burger;
	margin-top: 0.5rem;
	top: 5px;
	left: 0;
	display: block;
	background-color: rgba(200, 200, 200, 0.9);
	z-index: 100000;
	box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
	border-radius: 0 0 10px 10px;
`;

const BurgerDropDownItemView = styled.div`
	color: black;
	text-align: center;
	margin: 0.25rem;
	line-height: 2;
	&:hover {
		background-color: rgba(0, 0, 0, 0.1);
		border-radius: 5px;
	}
`;

const BurgerMenuItem = ({ to, text }: any) => (
	<Link to={to}>
		<BurgerDropDownItemView>{text}</BurgerDropDownItemView>
	</Link>
);

const BurgerDropDown = ({ burgerMenuOpen, setBurgerMenuOpen }: any) => {
	const { logout } = useAuth0();
	const { user } = useAuth0();

	let userRole;
	if (user) {
		if (user["https://dfzservice.no/roles"]) {
			userRole = user["https://dfzservice.no/roles"][0];
		}
	}

	return (
		<>
			{burgerMenuOpen && (
				<BurgerDropDownView>
					<div
						onClick={() => {
							setBurgerMenuOpen(false);
						}}
					>
						<BurgerMenuItem to="/" text="Home" />
						<BurgerMenuItem to="/search" text="Search" />
						<BurgerMenuItem to="/parts" text="Parts" />
						<BurgerMenuItem to="/messages" text="Messages" />
						{userRole === "admin" && (
							<BurgerMenuItem to="/admin" text="Admin" />
						)}
						<BurgerMenuItem to="/settings" text="Settings" />
						<BurgerDropDownItemView
							onClick={() => {
								logout({ returnTo: window.location.origin });
							}}
						>
							Logout
						</BurgerDropDownItemView>
					</div>
				</BurgerDropDownView>
			)}
		</>
	);
};

export default BurgerDropDown;
