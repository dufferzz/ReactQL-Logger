import styled from "styled-components";
import { Link } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogoutButton from "../_SharedComponents/Buttons/LogoutButton";
import {
	faClipboardList,
	faSearch,
	faCarBattery,
	faCogs,
	faEnvelope,
	faUserCog,
	faHome,
} from "@fortawesome/free-solid-svg-icons";

const BurgerDropDownView = styled.div`
	width: 100%;

	grid-area: burger;
	padding-top: 1rem;
	height: 100%;
	display: block;
	color: black;
	/* background-color: #222; */
	background-color: rgba(200, 200, 200, 1);
	z-index: 1000000000;
	box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
	border-radius: 0 0 10px 10px;
`;

const BurgerDropDownItemView = styled.div`
	/* color: black; */
	text-align: left;
	margin: 0.25rem;
	display: flex;
	justify-content: space-between;
	padding: 0.25rem;
	line-height: 2;
	transition: color 0.2s;

	&:hover {
		background-color: rgba(0, 0, 0, 0.1);
		border-radius: 5px;
		color: darkorange;
		transition: color 0.1s;
		text-shadow: 1px 1px rgba(0, 0, 0, 0.5);
	}
`;

const StyledIcon = styled(FontAwesomeIcon)`
	/* color: black; */
	filter: drop-shadow(1px 1px 0 rgba(0, 0, 0, 0.5));
	cursor: pointer;
	color: darkorange;
	font-size: 1.75rem;
	transition: color 0.2s;
	transition: scale 0.2s ease-in-out;

	padding-left: 1rem;
`;

const BurgerMenuItem = ({ to, text, icon }: any) => (
	<Link to={to}>
		<BurgerDropDownItemView>
			<div style={{}}>
				<StyledIcon icon={icon} />
			</div>
			<div
				style={{
					display: "flex",
					width: "100%",
					justifyContent: "space-evenly",
				}}
			>
				{text}
			</div>
		</BurgerDropDownItemView>
	</Link>
);

const BurgerDropDown = ({ style }: any) => {
	const { user } = useAuth0();

	let userRole;
	if (user) {
		if (user["https://dfzservice.no/roles"]) {
			userRole = user["https://dfzservice.no/roles"][0];
		}
	}

	return (
		<>
			<BurgerDropDownView style={style}>
				<div>
					<div style={{ textAlign: "center" }}>
						<img
							width="125px"
							style={{
								width: "125px",
								height: "125px",
								borderRadius: "10px",
							}}
							src={user.picture}
							alt="avatar"
						/>
						<div>{user.email}</div>
					</div>
					<hr />
					<BurgerMenuItem to="/" icon={faHome} text="Home" />
					<BurgerMenuItem to="/search" icon={faSearch} text="Search" />
					<BurgerMenuItem to="/jobs" icon={faClipboardList} text="Jobs" />
					<BurgerMenuItem to="/parts" icon={faCarBattery} text="Parts" />
					<BurgerMenuItem to="/messages" icon={faEnvelope} text="Messages" />
					<hr />
					<BurgerMenuItem to="/profile" icon={faUserCog} text="My Profile" />

					{userRole === "admin" && (
						<BurgerMenuItem to="/admin" icon={faCogs} text="Admin" />
					)}
					<BurgerMenuItem to="/settings" icon={faCogs} text="App Settings" />

					<LogoutButton style={{ padding: "0.5rem", width: "100%" }} />
				</div>
			</BurgerDropDownView>
		</>
	);
};

const Shadow = styled.div`
	position: absolute;
	background-color: rgba(0, 0, 0, 0.5);
	width: 100%;
	top: -6px;
	left: 0;
	min-height: 100%;
	z-index: 1;
`;

export { BurgerDropDown, Shadow };
