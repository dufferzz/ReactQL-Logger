import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const Loading = () => {
	return (
		<>
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Loader
					type="TailSpin"
					color="darkorange"
					height={50}
					width={50}
					timeout={10000} // 10 secs
				/>
			</div>
		</>
	);
};

export default Loading;
