import React from "react";
import Button from "../../_StyledComponents/Button";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
	const { logout } = useAuth0();
	return (
		<Button
			onClick={() => {
				logout({ returnTo: window.location.origin });
			}}
		>
			Logout
		</Button>
	);
};

export default LogoutButton;
