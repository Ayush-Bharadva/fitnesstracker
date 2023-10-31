import React from "react";
import "../../App.scss";

function RightSideBar({ children }) {
	return (
		<div className="sidebar right flex-column">
			<h2>Activity</h2>
			<div className="flex activity-tracker">{children}</div>
		</div>
	);
}

export default RightSideBar;
