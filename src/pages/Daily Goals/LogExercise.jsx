import React, { useEffect, useState } from "react";
import training from "../../assets/images/training.jpg";
import { getProfileStatus, isUserLoggedIn } from "../../services/helper";
import { addExerciseService } from "../../services/services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialValue = {
	exerciseType: "",
	duration: "",
	caloriesBurned: "",
};

function LogExercise({ addExercise }) {
	const showAddToast = () => {
		toast.success("Exercise added..", {
			position: toast.POSITION.TOP_RIGHT,
		});
	};
	const showDuplicateToast = () => {
		toast.error("Exercise-Type already added..", {
			position: toast.POSITION.TOP_RIGHT,
		});
	};

	const [exerciseInfo, setExerciseInfo] = useState({
		exerciseType: "",
		duration: "",
		caloriesBurned: "",
	});

	const handleInputChange = (input, value) => {
		setExerciseInfo((prevInfo) => ({ ...prevInfo, [input]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(exerciseInfo);
		// console.log(logInStatus);

		if (isUserLoggedIn() && getProfileStatus()) {
			const response = await addExerciseService(exerciseInfo);
			console.log(response);
			if (response.status === 200) {
				showAddToast();
				addExercise(exerciseInfo);
				setExerciseInfo(initialValue);
				console.log("exercise added successfully..");
			} else if (response.status === 409) {
				showDuplicateToast();
				console.log("exercise added already..");
			}
		} else {
			console.log("Make sure you have logged in OR created profile");
		}
	};
	return (
		<>
			{/* <div className="log-exercise-section"> */}
			{/* <div className="exercises-image">
					<img src={training} alt="" />
				</div> */}
			<div className="log-exercise-form">
				<form action="" onSubmit={handleSubmit}>
					<h2>Log Exercise</h2>
					<div className="field">
						<label htmlFor="exercise">Exercise Type</label>
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
							<option value="Walking">Walking</option>
							<option value="Running">Running</option>
							<option value="Weight_lifting">
								Weight lifting
							</option>
							<option value="Gym">Gym</option>
							<option value="Yoga">Yoga</option>
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
									Number(e.target.value)
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
									Number(e.target.value)
								)
							}
							placeholder="enter calories burned (approx)"
							required
						/>
					</div>
					<div className="field">
						<button
							className="btn"
							type="submit"
							onClick={handleSubmit}
							disabled={false}>
							Add exercise
						</button>
					</div>
				</form>
				<ToastContainer />
			</div>
			{/* </div> */}
		</>
	);
}

export default LogExercise;
