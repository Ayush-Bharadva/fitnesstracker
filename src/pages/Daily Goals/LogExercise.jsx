import React, { useEffect, useState } from "react";
import training from "../../assets/images/training.jpg";

function LogExercise({ addExercise }) {
	const [exerciseInfo, setExerciseInfo] = useState({
		exerciseType: "",
		duration: "",
		caloriesBurned: "",
	});

	// useEffect(() => {
	// 	if (editExercise) {
	// 		setExerciseInfo({
	// 			exerciseType: editExercise["exerciseType"],
	// 			duration: editExercise["duration"],
	// 			caloriesBurned: editExercise["caloriesBurned"],
	// 		});
	// 	}
	// }, [editExercise]);

	const handleInputChange = (input, value) => {
		setExerciseInfo((prevInfo) => ({ ...prevInfo, [input]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		addExercise(exerciseInfo);
	};
	return (
		<>
			<div className="log-exercise-section">
				<div className="exercises-image">
					<img src={training} alt="" />
				</div>
				<div className="log-exercise-form">
					<form action="" onSubmit={handleSubmit}>
						<h2>Log Exercise</h2>
						<div className="field">
							<label htmlFor="exercise">exercise type</label>
							<select
								name="exercise"
								id="exercise"
								value={exerciseInfo["exerciseType"]}
								onChange={(e) =>
									handleInputChange(
										"exerciseType",
										e.target.value
									)
								}
								required
								placeholder="select exercise type">
								<option value="">Select exercise type</option>
								<option value="walking">Walking</option>
								<option value="running">Running</option>
								<option value="weight-lifting">
									Weight lifting
								</option>
								<option value="gym">Gym</option>
								<option value="yoga">Yoga</option>
							</select>
						</div>
						<div className="field">
							<label htmlFor="duration">Duration</label>
							<input
								type="number"
								id="duration"
								name="duration"
								value={exerciseInfo["duration"]}
								onChange={(e) =>
									handleInputChange(
										"duration",
										e.target.value
									)
								}
								placeholder="exercise duration (in min)"
								required
							/>
						</div>
						<div className="field">
							<label htmlFor="calories">Calories Burned</label>
							<input
								type="number"
								id="calories"
								name="calories"
								value={exerciseInfo["caloriesBurned"]}
								onChange={(e) =>
									handleInputChange(
										"caloriesBurned",
										e.target.value
									)
								}
								placeholder="enter calories burned (approx)"
								required
							/>
						</div>
						<button type="submit">Log Exercise</button>
					</form>
					<button className="btn" disabled={false}>
						Add more exercise
					</button>
				</div>
			</div>
		</>
	);
}

export default LogExercise;
