import React, { useState } from "react";
import LogExercise from "./LogExercise";
import LogMeals from "./LogMeals";
import RecordTracker from "./RecordTracker";

function DailyGoals() {
	const [userExerciseRecords, setUserExerciseRecords] = useState([]);
	const [mealRecords, setMealRecords] = useState([]);
	const [editExercise, setEditExercise] = useState({});

	const addExercise = (exerciseInfo) => {
		setUserExerciseRecords([...userExerciseRecords, exerciseInfo]);
		console.log(userExerciseRecords);
	};

	const handleEditExercise = (index) => {
		console.log("edit exercise index :", index);
		console.log(userExerciseRecords[index]);
		setEditExercise(userExerciseRecords[index]);
	};

	const deleteExercise = (index) => {
		console.log("delete occured");
		const updatedExercise = userExerciseRecords.filter(
			(_, i) => i !== index,
			[]
		);
		setUserExerciseRecords(updatedExercise);
		console.log(userExerciseRecords);
	};

	const addMeals = (mealInfo) => {
		console.log(mealInfo);
		setMealRecords([...mealRecords, mealInfo]);
		console.log(mealRecords);
	};

	const deleteMeal = (index) => {
		const updatedMeals = mealRecords.filter((_, i) => i !== index, []);
		setMealRecords(updatedMeals);
	};

	return (
		<div className="main-container flex-container">
			<LogExercise
				addExercise={addExercise}
				editExercise={editExercise}
			/>

			<RecordTracker
				exerciseRecords={userExerciseRecords}
				deleteExercise={deleteExercise}
				editExercise={handleEditExercise}
				mealRecords={mealRecords}
				deleteMeal={deleteMeal}
			/>

			<LogMeals addMeals={addMeals} />
		</div>
	);
}

export default DailyGoals;
