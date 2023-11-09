import React, { useState } from "react";
import "./DailyGoals.scss";
import { getProfileStatus, isUserLoggedIn } from "../../services/helper";
import { addExerciseService, addMealService } from "../../services/services";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function AddActivityForm({ isExercise, allDetails, setAllDetails }) {
	// console.log(allDetails);

	const showAddToast = (type = "success", message) => {
		toast[type](message, {
			position: toast.POSITION.TOP_RIGHT,
		});
	};

	const formType = isExercise ? "exercise" : "meal";

	let options = [];
	if (isExercise)
		options = ["Walking", "Running", "Weight_lifting", "Gym", "Yoga"];
	else options = ["Breakfast", "Lunch", "Dinner", "Snacks"];

	const [activityInfo, setActivityInfo] = useState({
		type: "",
		duration: "",
		ingredients: "",
		calories: "",
	});

	const addActivity = async () => {
		const { type, duration, ingredients, calories } = activityInfo;

		let response = isExercise
			? await addExerciseService({
					exerciseType: type,
					duration: duration,
					caloriesBurned: calories,
			  })
			: await addMealService({
					mealType: type,
					ingredients: ingredients,
					caloriesConsumed: calories,
			  });

		if (response.status === 200) {
			console.log("activity added successfully..");

			if (isExercise) {
				showAddToast("success", "exercise added successfully");
				setAllDetails({
					...allDetails,
					exerciseDetails: [
						...allDetails.exerciseDetails,
						{
							exerciseType: type,
							duration: duration,
							caloriesBurned: calories,
						},
					],
				});
			} else {
				showAddToast("success", "meal added successfully");
				setAllDetails({
					...allDetails,
					mealDetails: [
						...allDetails.mealDetails,
						{
							mealType: type,
							ingredients: ingredients,
							caloriesConsumed: calories,
						},
					],
				});
			}
		} else if (response.status === 409) {
			// showDuplicateToast();
			console.log("exercise added already..");
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (isUserLoggedIn() && getProfileStatus()) {
			addActivity();
		} else {
			console.log("Make sure you have logged in OR created profile");
		}
	};

	const handleInputChange = (input, value) => {
		if (input === "type") {
			const activityDetails = isExercise
				? allDetails.exerciseDetails.find(
						(exercise) => exercise.exerciseType === value
				  )
				: allDetails.mealDetails.find(
						(meal) => meal.mealType === value
				  );
			const {
				exerciseType = "",
				duration = "",
				caloriesBurned = "",
				mealType = "",
				ingredients = "",
				caloriesConsumed = "",
			} = activityDetails || {};

			setActivityInfo({
				type: exerciseType || mealType || value,
				duration,
				ingredients,
				calories: caloriesBurned || caloriesConsumed,
			});
		} else {
			setActivityInfo((prevInfo) => ({ ...prevInfo, [input]: value }));
		}
	};

	return (
		<div className="log-activity-form">
			<form action="" onSubmit={handleSubmit}>
				<h2>Log {formType}</h2>
				<div className="field">
					<label htmlFor="exercise">{formType} Type</label>
					<select
						name="type"
						id="exercise"
						value={activityInfo["type"]}
						onChange={(e) =>
							handleInputChange("type", e.target.value)
						}
						required>
						<option value="">Select exercise type</option>
						{options.map((data, index) => (
							<option key={index} value={data}>
								{data}
							</option>
						))}
					</select>
				</div>
				<div className="field">
					{isExercise ? (
						<>
							<label htmlFor="duration">Duration</label>
							<input
								type="number"
								id="duration"
								name="duration"
								value={activityInfo["duration"]}
								onChange={(e) =>
									handleInputChange(
										"duration",
										Number(e.target.value)
									)
								}
								placeholder="exercise duration (in min)"
								required
							/>
						</>
					) : (
						<>
							<label htmlFor="ingredients">Ingredients</label>
							<input
								type="text"
								id="ingredients"
								name="ingredients"
								value={activityInfo["ingredients"]}
								onChange={(e) =>
									handleInputChange(
										"ingredients",
										e.target.value
									)
								}
								placeholder="meal ingredients"
								required
							/>
						</>
					)}
				</div>
				<div className="field">
					<label htmlFor="calories">
						Calories {isExercise ? "burned" : "consumed"}
					</label>
					<input
						type="number"
						id="calories"
						name="calories"
						value={activityInfo["calories"]}
						onChange={(e) =>
							handleInputChange(
								"calories",
								Number(e.target.value)
							)
						}
						placeholder={
							isExercise
								? "enter calories burned (approx)"
								: "enter calories consumed (approx)"
						}
						required
					/>
				</div>
				<div className="field">
					<button
						className="btn"
						type="submit"
						onClick={handleSubmit}>
						{isExercise ? "Add exercise" : "Add meal"}
					</button>
				</div>
			</form>
			<ToastContainer />
		</div>
	);
}

export default AddActivityForm;
