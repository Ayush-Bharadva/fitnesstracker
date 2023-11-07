import React, { Fragment, useEffect, useState } from "react";
import LogExercise from "./LogExercise";
import LogMeals from "./LogMeals";
import "../../global.scss";
import "./DailyGoals.scss";
import { showExerciseService, showMealService } from "../../services/services";

function DailyGoals() {
	const [exerciseRecords, setExerciseRecords] = useState([]);
	const [mealRecords, setMealRecords] = useState([]);

	useEffect(() => {
		const fetchAllRecords = async () => {
			const date = new Date();
			const year = date.getFullYear().toString();
			const month = (date.getMonth() + 1).toString().padStart(2, "0");
			const day = date.getDate().toString().padStart(2, "0");
			const formatedDate = `${year}-${month}-${day}`;

			const exerciseResponse = await showExerciseService({
				date: formatedDate,
			});
			if (exerciseResponse.status === 200) {
				const exerciseData = exerciseResponse.data;
				setExerciseRecords(exerciseData);
			}
			const mealResponse = await showMealService({ date: formatedDate });
			if (mealResponse.status === 200) {
				const mealData = mealResponse.data;
				setMealRecords(mealData);
			}
		};

		fetchAllRecords();
	}, []);

	const addExercise = (exerciseInfo) => {
		console.log(exerciseInfo);
		console.log(exerciseRecords);
		if (exerciseRecords.length === 0) {
			setExerciseRecords([...exerciseRecords, exerciseInfo]);
		}

		if (exerciseRecords.length > 0) {
			const isDuplicateExercise = exerciseRecords.some(
				(data) => data.exerciseType === exerciseInfo.exerciseType
			);
			if (!isDuplicateExercise) {
				setExerciseRecords([...exerciseRecords, exerciseInfo]);
				console.log("exercise records :", exerciseRecords);
			} else {
				console.log("exercise type already added");
			}
		}
	};

	const addMeals = (mealInfo) => {
		console.log(mealInfo);
		console.log(mealRecords);

		if (mealRecords.length === 0) {
			setMealRecords([...mealRecords, mealInfo]);
		}

		if (mealRecords.length > 0) {
			const isDuplicateMeal = mealRecords.some(
				(data) => data.mealType === mealInfo.mealType
			);
			if (!isDuplicateMeal) {
				setMealRecords([...mealRecords, mealInfo]);
				console.log("meal Records :", mealRecords);
			} else {
				console.log("meal type already added");
			}
		}
	};

	return (
		<div className="daily-goals-container">
			<div className="flex">
				<LogExercise addExercise={addExercise} />
				<LogMeals addMeals={addMeals} />
			</div>
			<div className="daily-records">
				<h2 className="margin-bottom-1">Records</h2>
				<div className="my-records-container">
					{exerciseRecords.length > 0 ? (
						<div className="my-exercise-records">
							<h4 className="margin-bottom-1">your exercises</h4>
							{exerciseRecords.map((data) => (
								<Fragment key={data.exerciseType}>
									<p>Exercise Type : {data.exerciseType}</p>
									<p>Duratin : {data.duration}</p>
									<p>
										Calories Burned : {data.caloriesBurned}
									</p>
									<div className="spacer"></div>
								</Fragment>
							))}
						</div>
					) : (
						<p>no any Exercises added yet..</p>
					)}
					{mealRecords.length > 0 ? (
						<div className="my-meal-records">
							<h4 className="margin-bottom-1">your meals</h4>
							{mealRecords.map((data) => (
								<Fragment key={data.mealType}>
									<p>Meal Type : {data.mealType}</p>
									<p>Ingredients : {data.ingredients}</p>
									<p>
										Calories Consumed :{" "}
										{data.caloriesConsumed}
									</p>
									<div className="spacer"></div>
								</Fragment>
							))}
						</div>
					) : (
						<p>no any Meals added yet..</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default DailyGoals;
