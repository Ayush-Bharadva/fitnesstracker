import React, { useState } from "react";
import "../../App.scss";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSidebar";
import DayWiseRecord from "./DayWiseRecord";
import ExerciseOfDay from "./ExerciseOfDay";
import MealOfDay from "./MealOfDay";

function Home() {
	const [day, setDay] = useState("");
	const handleDayClick = (index) => {
		console.log("Day Clicked :", days[index]);
		setDay(days[index]);
	};
	const days = ["Day 1", "Day 2", "Day 3", "Day 4"];

	return (
		<>
			<div className="home-container flex">
				<LeftSideBar>
					<DayWiseRecord
						totalDays={days}
						handleDayClick={handleDayClick}
					/>
				</LeftSideBar>
				<RightSideBar>
					<ExerciseOfDay day={day} />
					<MealOfDay day={day} />
				</RightSideBar>
			</div>
		</>
	);
}

export default Home;
