import React from "react";
import "../../../App.scss";
import home from "../../../refrences/home.jpg";

function RightSideBar({ children }) {
	return (
		<div className="sidebar right">
			{/* <div className="home-poster">
				<img src={home} alt="" />
			</div> */}
			{children}
		</div>
	);
}

export default RightSideBar;
