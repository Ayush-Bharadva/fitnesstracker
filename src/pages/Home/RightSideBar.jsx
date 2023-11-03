import React from "react";
import "../../App.scss";

function RightSideBar({ children }) {
	return (
		<div className="sidebar right full-height overflow-auto">
			<h2 className="text-left margin-y-1">Activity</h2>
			<div className="">
				<div className="flex activity-tracker">{children}</div>
			</div>
		</div>
	);
}

export default RightSideBar;
