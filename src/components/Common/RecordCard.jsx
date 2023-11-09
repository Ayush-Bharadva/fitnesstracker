import React, { Fragment } from "react";
import "./RecordCard.scss";

function RecordCard({ allDetails }) {
	console.log("allDetails :", { ...allDetails });

	const { exerciseDetails, mealDetails, waterDetails, weightDetails } = {
		...allDetails,
	};

	console.log(exerciseDetails);

	return (
		<div className="record-card">
			<div className="records flex gap-1">
				<div className="full-width ">
					{exerciseDetails?.map((exercise, index) => (
						<Fragment key={index}>
							<div className="record-container exercise-card-bg">
								<div className="bg-cream">
									<div className="record-info">
										<p className="record-type font-bold">
											ExerciseType
										</p>
										<p>:</p>
										<p className="record-data">
											{exercise.exerciseType}
										</p>
									</div>
									<div className="record-info">
										<p className="font-bold">Duration</p>
										<p>:</p>
										<p>{exercise.duration}</p>
									</div>
									<div className="record-info">
										<p className="font-bold">
											Calories Burned
										</p>
										<p>:</p>
										<p>{exercise.caloriesBurned}</p>
									</div>
								</div>
								<div className="actions">
									<button className="record-delete">
										Delete
									</button>
								</div>
							</div>
						</Fragment>
					))}
				</div>
				<div className="full-width">
					{mealDetails?.length > 0 &&
						mealDetails.map((meal, index) => (
							<Fragment key={index}>
								<div className="record-container  meal-card-bg">
									<div className="bg-cream">
										<div className="record-info">
											<p className="record-type font-bold">
												MealType
											</p>
											<p>:</p>
											<p className="record-data">
												{meal.mealType}
											</p>
										</div>
										<div className="record-info">
											<p className="font-bold">
												Duration
											</p>
											<p>:</p>
											<p>{meal.ingredients}</p>
										</div>
										<div className="record-info">
											<p className="font-bold">
												Calories Burned
											</p>
											<p>:</p>
											<p>{meal.caloriesConsumed}</p>
										</div>
									</div>
									<div className="actions">
										<button className="record-delete">
											Delete
										</button>
									</div>
								</div>
							</Fragment>
						))}
				</div>
			</div>
		</div>
	);
}

export default RecordCard;
