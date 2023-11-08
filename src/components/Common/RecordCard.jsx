import React from "react";
import "./RecordCard.scss";

function RecordCard({ allDetails }) {
	console.log("allDetails :", { ...allDetails });

	const { exerciseDetails, mealDetails, waterDetails, weightDetails } = {
		...allDetails,
	};

	console.log(exerciseDetails);

	return (
		<div className="record-card">
			<div className="records">
				{exerciseDetails?.map((exercise) => (
					<>
						<div className="record-container">
							<div className="record-info">
								<p className="record-type">ExerciseType</p>
								<p>:</p>
								<p className="record-data">
									{exercise.exerciseType}
								</p>
							</div>
							<div className="record-info">
								<p>Duration</p>
								<p>:</p>
								<p>{exercise.duration}</p>
							</div>
							<div className="record-info">
								<p>Calories Burned</p>
								<p>:</p>
								<p>{exercise.caloriesBurned}</p>
							</div>
						</div>
					</>
				))}

				{/* <div className="record">
					<div className="type">
						<p>Walking</p>
					</div>
					<div className="info">
						<div className="data">
							<p>Duration</p> : <p className="value">30 min</p>
						</div>
						<div className="data">
							<p>Calories</p> : <p className="value">150 cal</p>
						</div>
					</div>
				</div> */}
			</div>

			<div className="actions">
				<button
					className="record-delete"
					// style={{ display: buttonDisabled ? "hidden" : "visible" }}
				>
					Delete
				</button>
			</div>
		</div>
	);
}

export default RecordCard;
