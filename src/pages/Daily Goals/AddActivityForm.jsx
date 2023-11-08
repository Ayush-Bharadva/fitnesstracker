import React, { useState } from "react";
import "./DailyGoals.scss";
import { getProfileStatus, isUserLoggedIn } from "../../services/helper";

function AddActivityForm({ isExercise, addExercise, addMeals }) {
	// console.log(isExercise);
	const formType = isExercise ? "exercise" : "meal";

	const activityInfo = {
		type: "",
		detail: "",
		calories: "",
	};

	const exerciseOptions = [
		{
			label: "exerciseType",
			value: ["Walking", "Running", "Gym", "Yoga", "WeightLifting"],
		},
	];

	const [exerciseInfo, setExerciseInfo] = useState({
		exerciseType: "",
		duration: "",
		caloriesBurned: "",
	});
	const [mealInfo, setMealInfo] = useState({
		mealType: "",
		ingredients: "",
		caloriesConsumed: "",
	});

	// const initialValue = isExercise
	// 	? {
	// 			exerciseType: "",
	// 			duration: "",
	// 			caloriesBurned: "",
	// 	  }
	// 	: {
	// 			mealType: "",
	// 			ingredients: "",
	// 			caloriesConsumed: "",
	// 	  };

	const handleSubmit = (e) => {
		e.preventDefault();

		if (isUserLoggedIn() && getProfileStatus()) {
			isExercise
				? addExercise(exerciseInfo) && setExerciseInfo(initialValue)
				: addMeals(mealInfo) && setMealInfo(initialValue);
		} else {
			console.log("Make sure you have logged in OR created profile");
		}
	};

	const handleInputChange = (input, value) => {
		isExercise
			? setExerciseInfo((prevInfo) => ({ ...prevInfo, [input]: value }))
			: setMealInfo((prevInfo) => ({ ...prevInfo, [input]: value }));
	};

	return (
		<div className="log-activity-form">
			<h3>new form</h3>
			<form action="" onSubmit={handleSubmit}>
				<h2>Log {formType}</h2>
				<div className="field">
					<label htmlFor="exercise">{formType} Type</label>
					<select
						name="type"
						id="exercise"
						value={exerciseInfo["exerciseType"]}
						onChange={(e) =>
							handleInputChange("exerciseType", e.target.value)
						}
						required
						placeholder="select exercise type">
						<option value="">Select exercise type</option>
						<option value="Walking">Walking</option>
						<option value="Running">Running</option>
						<option value="Weight_lifting">Weight lifting</option>
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
			{/* {isExercise ? (
				<form action="" onSubmit={handleSubmit}>
					<h2>Log Exercise</h2>
					<div className="field">
						<label htmlFor="exercise">Exercise Type</label>
						<select
							name="type"
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
			) : (
				<form action="" onSubmit={handleSubmit}>
					<h2>Log Meals</h2>
					<div className="field">
						<label htmlFor="meal">Meal Type</label>
						<select
							name="meals"
							id="meal"
							value={mealInfo["mealType"]}
							onChange={(e) =>
								handleInputChange("mealType", e.target.value)
							}
							required>
							<option value="">Select meals type</option>
							<option value="Breakfast">Breakfast</option>
							<option value="Lunch">Lunch</option>
							<option value="Dinner">Dinner</option>
							<option value="Snacks">Snacks</option>
						</select>
					</div>
					<div className="field">
						<label htmlFor="ingredients">Ingredients</label>
						<input
							type="text"
							id="ingredients"
							name="ingredients"
							value={mealInfo["ingredients"]}
							onChange={(e) =>
								handleInputChange("ingredients", e.target.value)
							}
							placeholder="meal ingredients"
							required
						/>
					</div>
					<div className="field">
						<label htmlFor="calories">Calories</label>
						<input
							type="number"
							id="calories"
							name="caloriesConsumed"
							value={mealInfo["caloriesConsumed"]}
							onChange={(e) =>
								handleInputChange(
									"caloriesConsumed",
									Number(e.target.value)
								)
							}
							placeholder="estimated calories"
							required
						/>
					</div>

					<div className="field">
						<button
							type="submit"
							className="btn"
							onClick={handleSubmit}>
							Add meal
						</button>
					</div>
				</form>
			)} */}
		</div>
	);
}

export default AddActivityForm;
