import React from "react";
// import Main from "../UI/Main";
import LogExercise from "./Daily Goals/LogExercise";
import LogMeals from "./Daily Goals/LogMeals";

function DailyGoals() {
	return (
		<div className="main-container flex-container">
			<LogExercise />
			<LogMeals />
		</div>
	);
}

export default DailyGoals;
