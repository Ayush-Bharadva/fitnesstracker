import React, { useState } from "react";
import { isUserLoggedIn } from "../../utils/helper";
import {
	addExerciseService,
	addMealService,
	updateExerciseServise,
	updateMealService,
} from "../../services/services";
import { ToastContainer, toast } from "react-toastify";
import "./AddActivityForm.scss";
import "react-toastify/dist/ReactToastify.css";

const initialValue = {
	type: "",
	duration: "",
	ingredients: "",
	calories: "",
};

function AddActivityForm({ isExercise, allDetails, setAllDetails }) {
	const [activityInfo, setActivityInfo] = useState({
		type: "",
		duration: "",
		ingredients: "",
		calories: "",
	});
	const formType = isExercise ? "Exercise" : "Meal";
	const [buttonText, setButtonText] = useState("Add");

	const showToast = (type, message) => {
		toast[type](message, {
			position: toast.POSITION.TOP_RIGHT,
		});
	};

	let options = [];
	if (isExercise)
		options = ["Walking", "Running", "Weight Lifting", "Gym", "Yoga"];
	else options = ["Breakfast", "Lunch", "Dinner", "Snacks"];

	const updateActivity = async () => {
		const { type, duration, ingredients, calories } = activityInfo;

		let response = isExercise
			? await updateExerciseServise({
					exerciseType:
						type === "Weight Lifting" ? "Weight_lifting" : type,
					duration: duration,
					caloriesBurned: calories,
			  })
			: await updateMealService({
					mealType: type,
					ingredients: ingredients,
					caloriesConsumed: calories,
			  });

		if (response.status === 200) {
			const previousActivity = isExercise
				? allDetails.exerciseDetails.find(
						(exercise) => exercise.exerciseType === type
				  )
				: allDetails.mealDetails.find((meal) => meal.mealType === type);

			const updatedDetails = isExercise
				? {
						exerciseDetails: allDetails.exerciseDetails.map(
							(exercise) =>
								exercise.exerciseType ===
								previousActivity.exerciseType
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
							meal.mealType === previousActivity.mealType
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
			setActivityInfo(initialValue);
			setButtonText("Add");
		} else {
			showToast("error", "some error occured while Updating Activity!");
		}
	};

	const addActivity = async () => {
		const { type, duration, ingredients, calories } = activityInfo;

		let response = isExercise
			? await addExerciseService({
					exerciseType:
						type === "Weight Lifting" ? "Weight_lifting" : type,
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
				showToast("success", "exercise added successfully");
			} else {
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
				showToast("success", "meal added successfully");
			}
			setActivityInfo(initialValue);
			setButtonText("Add");
		} else if (response.status === 409) {
			showToast("error", "Activity added already..");
		} else if (response.status === 400) {
			showToast(
				"error",
				"Fields cannot be empty or zero while Adding Activity!"
			);
		} else {
			showToast("error", "some error occured while Adding Activity!");
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isUserLoggedIn()) {
			buttonText === "Add" ? addActivity() : updateActivity();
		} else {
			showToast(
				"error",
				"Make sure you have logged in OR created profile"
			);
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
			<h2 className="form-heading">Log {formType}</h2>
			<form action="" onSubmit={handleSubmit}>
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
								placeholder="Exercise duration (in min)"
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
								placeholder="Meal ingredients"
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
								? "Enter calories burned (approx)"
								: "Enter calories consumed (approx)"
						}
						required
					/>
				</div>

				<button className="btn" type="submit" onClick={handleSubmit}>
					{isExercise
						? `${buttonText} Exercise`
						: `${buttonText} Meal`}
				</button>
			</form>
			<ToastContainer />
		</>
	);
}

export default AddActivityForm;
