import React, { useState } from "react";
import training from "../../../assets/images/training.jpg";

function LogExercise() {
	const [exerciseInfo, setExerciseInfo] = useState({
		"exercise-type": "",
		"exercise-duration": "",
		"burned-calories": "",
	});

	const handleInputChange = (input, value) => {
		setExerciseInfo((prevInfo) => ({ ...prevInfo, [input]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("exerciseInfo :", exerciseInfo);
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
								value={exerciseInfo["exercise-type"]}
								onChange={(e) =>
									handleInputChange(
										"exercise-type",
										e.target.value
									)
								}
								placeholder="select exercise type">
								<option value="">select exercise type</option>
								<option value="walking">walking</option>
								<option value="running">running</option>
								<option value="weight-lifting">
									weight lifting
								</option>
								<option value="gym">gym</option>
								<option value="yoga">yoga</option>
							</select>
						</div>
						<div className="field">
							<label htmlFor="duration">duration</label>
							<input
								type="number"
								id="duration"
								name="duration"
								value={exerciseInfo["exercise-duration"]}
								onChange={(e) =>
									handleInputChange(
										"exercise-duration",
										e.target.value
									)
								}
								placeholder="exercise duration (in min)"
							/>
						</div>
						<div className="field">
							<label htmlFor="calories">calories burned</label>
							<input
								type="number"
								id="calories"
								name="calories"
								value={exerciseInfo["burned-calories"]}
								onChange={(e) =>
									handleInputChange(
										"burned-calories",
										e.target.value
									)
								}
								placeholder="enter calories burned (approx)"
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
