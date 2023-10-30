import React from "react";
import "./DailyGoals.scss";

function ExerciseRecords({ exerciseRecords, deleteExercise }) {
	console.log(exerciseRecords);

	return (
		<div className="records-container flex">
			<div className="exercise-records flex-column">
				<h2>ExerciseRecords</h2>
				{exerciseRecords.map((exercise, index) => (
					<div key={index} className="record flex">
						<div className="info flex">
							<p>
								<span>Exercise : </span>
								{exercise["exerciseType"]}
							</p>
							<p>
								<span>Duration : </span>
								{exercise["duration"]}
							</p>
							<p>
								<span>Calories : </span>
								{exercise["caloriesBurned"]}
							</p>
						</div>
						<div className="actions">
							<button
								className="edit-btn"
								onClick={() => console.log("edit occured")}>
								Edit
							</button>
							<button
								className="delete-btn"
								onClick={() => deleteExercise(index)}>
								delete
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default ExerciseRecords;
