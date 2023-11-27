import React from "react";
import ReactLoading from "react-loading";
import "./Loader.scss";

function Loader({ type, color, height, width }) {
	return (
		<>
			<ReactLoading
				type={type || "spin"}
				color={color || "blue"}
				height={height || "64px"}
				width={width || "64px"}
				className="loader"
			/>
		</>
	);
}

export default Loader;
