import React from "react";
import ExerciseRecords from "./ExerciseRecords";
import MealRecords from "./MealRecords";

function RecordTracker({
	exerciseRecords,
	deleteExercise,
	mealRecords,
	deleteMeal,
}) {
	return (
		<div className="record-tracker flex">
			{exerciseRecords.length > 0 ? (
				<ExerciseRecords
					exerciseRecords={exerciseRecords}
					deleteExercise={deleteExercise}
				/>
			) : (
				<h2 className="empty-record">No exercise records</h2>
			)}
			{mealRecords.length > 0 ? (
				<MealRecords
					mealRecords={mealRecords}
					deleteMeal={deleteMeal}
				/>
			) : (
				<h2 className="empty-record">No meals records</h2>
			)}
		</div>
	);
}

export default RecordTracker;
