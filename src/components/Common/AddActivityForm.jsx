import React, { useMemo, useState } from "react";
import { showToast } from "../../utils/helper";
import {
	addExerciseService,
	addMealService,
	updateExerciseServise,
	updateMealService,
} from "../../services/services";
import { ToastContainer } from "react-toastify";
import "./AddActivityForm.scss";
import "react-toastify/dist/ReactToastify.css";

const initialValue = {
	type: "",
	duration: "",
	ingredients: "",
	calories: "",
};

function AddActivityForm({ isExercise, allDetails, setAllDetails }) {
	const { exerciseDetails, mealDetails } = allDetails || {};
	const [activityDetails, setActivityDetails] = useState(initialValue);
	const [buttonText, setButtonText] = useState("Add");

	const formType = useMemo(
		() => (isExercise ? "Exercise" : "Meal"),
		[isExercise]
	);
	const options = useMemo(
		() =>
			isExercise
				? ["Walking", "Running", "Weight Lifting", "Gym", "Yoga"]
				: ["Breakfast", "Lunch", "Dinner", "Snacks"],
		[isExercise]
	);

	const getActivityDetails = (type) => {
		let activityType = type === "Weight Lifting" ? "Weight_lifting" : type;
		return isExercise
			? exerciseDetails?.find(
					(exercise) => exercise.exerciseType === activityType
			  )
			: mealDetails?.find((meal) => meal.mealType === type);
	};

	const { type, duration, ingredients, calories } = activityDetails;

	const updateActivityDetails = (type, duration, calories) => {
		return isExercise
			? updateExerciseServise({
					exerciseType:
						type === "Weight Lifting" ? "Weight_lifting" : type,
					duration,
					caloriesBurned: calories,
			  })
			: updateMealService({
					mealType: type,
					ingredients: activityDetails.ingredients,
					caloriesConsumed: calories,
			  });
	};

	const handleInputChange = (input, value) => {
		if (input === "type") {
			const activityDetails = getActivityDetails(value);
			setButtonText(!activityDetails ? "Add" : "Edit");

			const {
				exerciseType = "",
				duration = "",
				caloriesBurned = "",
				mealType = "",
				ingredients = "",
				caloriesConsumed = "",
			} = activityDetails || {};

			setActivityDetails({
				type:
					exerciseType === "Weight_lifting"
						? "Weight Lifting"
						: exerciseType || mealType || value,
				duration,
				ingredients,
				calories: caloriesBurned || caloriesConsumed,
			});
		} else {
			setActivityDetails((prevInfo) => ({ ...prevInfo, [input]: value }));
		}
	};

	const updateActivity = async () => {
		const response = await updateActivityDetails(type, duration, calories);

		if (response.status === 200) {
			const previousActivity = getActivityDetails(type);

			const updatedDetails = isExercise
				? {
						exerciseDetails: exerciseDetails.map((exercise) =>
							exercise.exerciseType ===
							previousActivity.exerciseType
								? {
										...exercise,
										duration,
										caloriesBurned: calories,
								  }
								: exercise
						),
				  }
				: {
						mealDetails: mealDetails.map((meal) =>
							meal.mealType === previousActivity.mealType
								? {
										...meal,
										ingredients,
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
			setActivityDetails(initialValue);
			setButtonText("Add");
		} else {
			showToast("error", "some error occured while Updating Activity!");
		}
	};

	const addActivity = async () => {
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
			const newActivity = isExercise
				? {
						exerciseType:
							type === "Weight Lifting" ? "Weight_lifting" : type,
						duration,
						caloriesBurned: calories,
				  }
				: { mealType: type, ingredients, caloriesConsumed: calories };

			const activityDetailsType = isExercise
				? "exerciseDetails"
				: "mealDetails";

			setAllDetails({
				...allDetails,
				[activityDetailsType]: [
					...(allDetails[activityDetailsType] || []),
					newActivity,
				],
			});
			showToast(
				"success",
				`${formType.toLowerCase()} added successfully`
			);
			setActivityDetails(initialValue);
			setButtonText("Add");
		} else {
			showToast("error", "some error occured while Adding Activity!");
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const isValidInputs = isExercise
			? duration > 0 && calories > 0
			: ingredients && calories > 0;
		if (!isValidInputs) {
			showToast("error", "Please enter valid details");
			return;
		}
		if (buttonText === "Add") {
			addActivity();
		} else {
			updateActivity();
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
						value={activityDetails["type"]}
						onChange={(e) =>
							handleInputChange("type", e.target.value)
						}
						required
					>
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
								value={activityDetails["duration"]}
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
								value={activityDetails["ingredients"]}
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
						value={activityDetails["calories"]}
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
