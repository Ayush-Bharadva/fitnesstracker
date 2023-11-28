import React from "react";
import ReactLoading from "react-loading";
import "./Loader.scss";

function Loader({ type, color, height, width }) {
	return (
		<div className="loader-container">
			<ReactLoading
				type={type || "spin"}
				color={color || "#37455f"}
				height={height || "64px"}
				width={width || "64px"}
				className="loader"
			/>
		</div>
	);
}

export default Loader;
