import React from "react";
import "../../App.scss";

function RightSideBar({ children }) {
	return (
		<div className="sidebar right flex-column">
			<div className="full-height overflow-auto">
				<h2>Activity</h2>
				<div className="flex activity-tracker">{children}</div>
			</div>
		</div>
	);
}

export default RightSideBar;
