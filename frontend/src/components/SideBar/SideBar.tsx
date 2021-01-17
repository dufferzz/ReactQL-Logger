import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import FlexDiv from "../StyledComponents/FlexDiv";

import {
	faClipboardList,
	faSearch,
	faCarBattery,
	faCogs,
	faEnvelope,
	faSignOutAlt,
	faSignInAlt,
	faUserCog,
} from "@fortawesome/free-solid-svg-icons";

const StyledSideBar = styled.div`
	grid-area: sidebar;
	width: 90px;
	text-align: center;
	padding-top: 0.5rem;
	background: rgba(195, 195, 195, 1);
	background: linear-gradient(
		90deg,
		rgba(195, 195, 195, 1) 0%,
		rgba(218, 218, 218, 1) 100%
	);
	box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.4);
	@media (max-width: 580px) {
		display: none;
	}
	transition: width 0.2s;
	&:hover {
		width: 100px;
		transition: width 0.2s;
	}
`;

const StyledIcon = styled(FontAwesomeIcon)`
	color: darkorange;
	font-size: 2.5rem;
	filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.5));
	cursor: pointer;
	transition: color 0.2s;
	transition: scale 0.2s ease-in-out;
	&:hover {
		transition: color 0.2s;
		color: orange;
		transform: scale(1.1);
	}
`;

const Badge = styled.div`
	background-color: red;
	color: white;
	border-radius: 50px;
	position: absolute;
	top: 0;
	font-size: 0.8rem;
	padding: 0.1rem 0.3rem;
	right: 10px;
	box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
`;
const SecondaryBadge = styled.div`
	background-color: khaki;
	color: black;
	border-radius: 50px;
	position: absolute;
	top: 0;
	font-size: 0.8rem;
	padding: 0.1rem 0.3rem;
	left: 10px;
	box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
`;

const IconTitle = styled.div`
	color: black;
	padding: 0.2rem;
	display: block;
`;

const MenuEntry = (props: any) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<FlexDiv
				style={{
					paddingTop: "0.7rem",
					position: "relative",
					cursor: "pointer",
				}}
				onMouseLeave={() => {
					setIsOpen(false);
				}}
				onMouseEnter={() => {
					setIsOpen(true);
				}}
			>
				<NavLink
					activeClassName="selected"
					style={{ width: "100%", height: "100%" }}
					to={props.url}
				>
					<StyledIcon icon={props.icon} />
					{props.badge && (
						<Badge title={`${props.badge.title}: ${props.badge.number}`}>
							{props.badge.number}
						</Badge>
					)}
					{props.secondaryBadge && (
						<SecondaryBadge
							title={`${props.secondaryBadge.title}: ${props.secondaryBadge.number}`}
						>
							{props.secondaryBadge.number}
						</SecondaryBadge>
					)}

					<IconTitle>{props.text}</IconTitle>
				</NavLink>
			</FlexDiv>
			<hr />
		</>
	);
};

const menuEntries = [
	{
		text: "Search",
		icon: faSearch,
		url: "/search",
	},

	{
		text: "Jobs",
		icon: faClipboardList,
		badge: { title: "New Jobs", number: "6" },
		secondaryBadge: { title: "Not Started", number: "6" },
		url: "/jobs",
	},
	{
		text: "Parts",
		icon: faCarBattery,
		url: "/parts",
	},
	{
		text: "Messages",
		icon: faEnvelope,
		badge: { title: "Unread", number: "1024" },
		url: "/messages",
	},
	{
		text: "Settings",
		icon: faCogs,
		url: "/settings",
	},
];

const SideBar = () => {
	const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
	return (
		<>
			{isAuthenticated && (
				<StyledSideBar>
					{menuEntries.map((item, i) => (
						<MenuEntry
							key={i}
							name={item.text}
							text={item.text}
							url={item.url}
							icon={item.icon}
							badge={item.badge}
							secondaryBadge={item.secondaryBadge}
						></MenuEntry>
					))}
					<FlexDiv style={{ paddingTop: "0.7rem" }}>
						<NavLink to="/admin">
							<StyledIcon
								style={{ color: "red" }}
								title="Admin"
								icon={faUserCog}
							/>
							<IconTitle>Admin</IconTitle>
						</NavLink>
					</FlexDiv>

					<hr />
					<FlexDiv
						style={{
							paddingTop: "0.7rem",
							cursor: "pointer",
							display: "flex",
							flexDirection: "column",
						}}
						onClick={() => {
							logout({ returnTo: window.location.origin });
						}}
					>
						<StyledIcon title="Logout" icon={faSignOutAlt} />
						<IconTitle>Logout</IconTitle>
					</FlexDiv>
				</StyledSideBar>
			)}
			{!isAuthenticated && (
				<StyledSideBar>
					<FlexDiv
						style={{
							paddingTop: "0.7rem",
							cursor: "pointer",
							display: "flex",
							flexDirection: "column",
						}}
					>
						<StyledIcon
							onClick={() => {
								loginWithRedirect();
							}}
							title="Log In now"
							icon={faSignInAlt}
						/>
					</FlexDiv>
				</StyledSideBar>
			)}
		</>
	);
};

export default SideBar;
