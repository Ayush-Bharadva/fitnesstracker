import React, { useState } from "react";
import run from "../../assets/images/run.jpg";
import "../../App.scss";
import LeftSideBar from "./Home/LeftSideBar";
import RightSideBar from "./Home/RightSidebar";

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
