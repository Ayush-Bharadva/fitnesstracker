import React, { useState } from "react";
import { getProfileStatus, isUserLoggedIn } from "../../services/helper";
import {
	addExerciseService,
	addMealService,
	updateExerciseServise,
	updateMealService,
} from "../../services/services";
import { ToastContainer, toast } from "react-toastify";
import "./DailyGoals.scss";
import "react-toastify/dist/ReactToastify.css";

const initialValue = {
	type: "",
	duration: "",
	ingredients: "",
	calories: "",
};

function AddActivityForm({ isExercise, allDetails, setAllDetails }) {
	// console.log(allDetails);

	const [activityInfo, setActivityInfo] = useState({
		type: "",
		duration: "",
		ingredients: "",
		calories: "",
	});

	const formType = isExercise ? "exercise" : "meal";

	const [buttonText, setButtonText] = useState("Add");

	const showToast = (type = "success", message) => {
		toast[type](message, {
			position: toast.POSITION.TOP_RIGHT,
		});
	};

	let options = [];
	if (isExercise)
		options = ["Walking", "Running", "Weight_lifting", "Gym", "Yoga"];
	else options = ["Breakfast", "Lunch", "Dinner", "Snacks"];

	const updateActivity = async () => {
		const { type, duration, ingredients, calories } = activityInfo;

		let response = isExercise
			? await updateExerciseServise({
					exerciseType: type,
					duration: duration,
					caloriesBurned: calories,
			  })
			: await updateMealService({
					mealType: type,
					ingredients: ingredients,
					caloriesConsumed: calories,
			  });

		if (response.status === 200) {
			const temp = isExercise
				? allDetails.exerciseDetails.find(
						(exercise) => exercise.exerciseType === type
				  )
				: allDetails.mealDetails.find((meal) => meal.mealType === type);

			const updatedDetails = isExercise
				? {
						exerciseDetails: allDetails.exerciseDetails.map(
							(exercise) =>
								exercise.exerciseType === temp.exerciseType
									? {
											...exercise,
											duration: duration,
											caloriesBurned: calories,
									  }
									: exercise
						),
				  }
				: {
						mealDetails: allDetails.mealDetails.map((meal) =>
							meal.mealType === temp.mealType
								? {
										...meal,
										ingredients: ingredients,
										caloriesConsumed: calories,
								  }
								: meal
						),
				  };

			setAllDetails({
				...allDetails,
				...updatedDetails,
			});

			showToast("success", "activity updated successfully");
		}

		setActivityInfo(initialValue);
	};

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
			if (isExercise) {
				showToast("success", "exercise added successfully");
				setAllDetails({
					...allDetails,
					exerciseDetails: [
						...(allDetails.exerciseDetails || []),
						{
							exerciseType: type,
							duration: duration,
							caloriesBurned: calories,
						},
					],
				});
			} else {
				showToast("success", "meal added successfully");
				setAllDetails({
					...allDetails,
					mealDetails: [
						...(allDetails.mealDetails || []),
						{
							mealType: type,
							ingredients: ingredients,
							caloriesConsumed: calories,
						},
					],
				});
			}
		} else if (response.status === 409) {
			showToast("error", "exercise added already..");
			console.log("exercise added already..");
		}

		setActivityInfo(initialValue);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isUserLoggedIn() && getProfileStatus()) {
			buttonText === "Add" ? addActivity() : updateActivity();
		} else {
			showToast(
				"error",
				"Make sure you have logged in OR created profile"
			);
			console.log("Make sure you have logged in OR created profile");
		}
	};

	const handleInputChange = (input, value) => {
		if (input === "type") {
			const activityDetails = isExercise
				? allDetails.exerciseDetails?.find(
						(exercise) => exercise.exerciseType === value
				  )
				: allDetails.mealDetails?.find(
						(meal) => meal.mealType === value
				  );
			setButtonText(!activityDetails ? "Add" : "Edit");

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
		<>
			<div className="log-activity-form">
				<form action="" onSubmit={handleSubmit}>
					<h2>Log {formType}</h2>
					<div className="field">
						<label htmlFor="activity">
							{isExercise ? "Exercise" : "Meal"} Type
						</label>
						<select
							name="type"
							id="activity"
							value={activityInfo["type"]}
							onChange={(e) =>
								handleInputChange("type", e.target.value)
							}
							required>
							<option value="">
								Select {isExercise ? "Exercise" : "Meal"} type
							</option>
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
							{isExercise
								? `${buttonText} exercise`
								: `${buttonText} meal`}
						</button>
					</div>
				</form>
			</div>
			<ToastContainer />
		</>
	);
}

export default AddActivityForm;
