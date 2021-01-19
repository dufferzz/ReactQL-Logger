import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "../../components/_StyledComponents/Button";

import BackgroundImageLow from "../../assets/images/forest_low.webp";
import BackgroundImage from "../../assets/images/forest.webp";

const useProgressiveImage = (src: any) => {
	const [sourceLoaded, setSourceLoaded] = useState(null);

	useEffect(() => {
		const img = new Image();
		img.src = src;
		img.onload = () => setSourceLoaded(src);
	}, [src]);

	return sourceLoaded;
};

const HomePage = () => {
	const loaded = useProgressiveImage(BackgroundImage);

	const { loginWithRedirect } = useAuth0();

	return (
		<div
			style={{
				textAlign: "center",
				width: "100%",
				height: "100%",
				backgroundImage: `url(${loaded || BackgroundImageLow})`,
				backgroundPosition: "center center",
				backgroundSize: "100%",
				color: "white",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<div
				style={{
					borderRadius: "10px",
					backgroundColor: "rgba(0,0,0,0.7)",
					width: "fit-content",
					padding: "1rem",
					boxShadow: "0 0 7px rgba(0,0,0,0.7)",
				}}
			>
				<div style={{ fontSize: "1.3rem", lineHeight: "3" }}>
					Welcome to DFZ Service and Repair Administration!
				</div>

				<div>
					<Button onClick={() => loginWithRedirect()}>Log in now</Button>
				</div>

				<div style={{ fontSize: "1.1rem", margin: "1rem" }}>
					Want more information?
				</div>
				<Button>
					<a href="https://github.com/dufferzz/DFZService-Stack">
						View this project on GitHub
					</a>
					!
				</Button>
			</div>
		</div>
	);
};

export default HomePage;
