import React, { useState } from "react";
import ExerciseOfDay from "./ExerciseOfDay";
import MealOfDay from "./MealOfDay";
import { FiChevronRight } from "react-icons/fi";
import "../../App.scss";
import "../../global.scss";

function Home() {
	const [day, setDay] = useState("");
	const handleDayClick = (index) => {
		console.log("Day Clicked :", days[index]);
		setDay(days[index]);
	};
	const days = [
		"Day 1",
		"Day 2",
		"Day 3",
		"Day 4",
		"Day 5",
		"Day 6",
		"Day 7",
	]; //api call to get all user days

	return (
		<>
			<div className="homepage flex">
				<div className="sidebar">
					<div className="sidebar-container">
						<h2 className="title">Daily Records</h2>
						{days.map((day, index) => (
							<button
								key={index}
								className="days"
								onClick={() => handleDayClick(index)}>
								{day} <FiChevronRight />
							</button>
						))}
					</div>
				</div>
				<div className="records flex">
					<div className="exercise-records flex-column gap-1">
						<p className="title text-left">Exercise performed</p>
						<ExerciseOfDay day={day} />
						<ExerciseOfDay day={day} />
					</div>
					<div className="meal-records flex-column gap-1">
						<p className="title text-left">Meals Taken</p>
						<MealOfDay day={day} />
						<MealOfDay day={day} />
					</div>
				</div>
			</div>
		</>
	);
}

export default Home;
