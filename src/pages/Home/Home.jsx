import React from "react";
import "../../App.scss";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSidebar";

function Home() {
	return (
		<>
			<div className="main">
				<LeftSideBar>left sidebar</LeftSideBar>
				<RightSideBar>right sidebar</RightSideBar>
			</div>
		</>
	);
}

export default Home;
