import { useMemo, useState } from "react";
import { PropTypes } from "prop-types";
import { showToast } from "../../utils/helper";
import { addExercise, addMeal, updateExercise, updateMeal } from "../../services/services";
import "./AddActivityForm.scss";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";
const initialValue = {
	type: "",
	duration: "",
	ingredients: "",
	calories: "",
};
import { ActivityFormContent, ExerciseType } from "../../constants/constants";

function AddActivityForm({ activityFormType, allDetails, setAllDetails }) {
	const { exerciseDetails, mealDetails } = allDetails || {};
	const [activityDetails, setActivityDetails] = useState(initialValue);
	const [buttonText, setButtonText] = useState("Add");
	const [isLoading, setIsLoading] = useState(false);

	const formInfo = ActivityFormContent[activityFormType];

	const { formType, activityHeading, activityText, optionText, calorieText, caloriePlaceholder } = formInfo;

	const options = useMemo(
		() =>
			activityFormType === "exercise"
				? ["Walking", "Running", "Weight Lifting", "Gym", "Yoga"]
				: ["Breakfast", "Lunch", "Dinner", "Snacks"],
		[activityFormType]
	);

	const handleType = (type) => (type === "weight lifting" ? ExerciseType["Weight_lifting"] : type);

	const getActivityDetails = (type) => {
		let activityType = handleType(type);
		return activityFormType === "exercise"
			? exerciseDetails?.find((exercise) => exercise.exerciseType === activityType)
			: mealDetails?.find((meal) => meal.mealType === type);
	};

	const { type, duration, ingredients, calories } = activityDetails;

	const updateActivityDetails = (type, duration, calories) => {
		return activityFormType === "exercise"
			? updateExercise({
					exerciseType: handleType(type),
					duration,
					caloriesBurned: calories,
			  })
			: updateMeal({
					mealType: type,
					ingredients: activityDetails.ingredients,
					caloriesConsumed: calories,
			  });
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;

		if (name === "type") {
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
				type: exerciseType === "Weight_lifting" ? "Weight Lifting" : exerciseType || mealType || value,
				duration,
				ingredients,
				calories: caloriesBurned || caloriesConsumed,
			});
		} else {
			setActivityDetails((prevInfo) => ({
				...prevInfo,
				[name]: name === "ingredients" ? value : Number(value),
			}));
		}
	};

	const updateActivity = async () => {
		setIsLoading(true);
		const response = await updateActivityDetails(type, duration, calories);
		setIsLoading(false);
		if (response.status === 200) {
			const previousActivity = getActivityDetails(type);

			let updatedDetails;
			if (activityFormType === "exercise") {
				updatedDetails = {
					exerciseDetails: exerciseDetails.map((exercise) =>
						exercise.exerciseType === previousActivity.exerciseType
							? {
									...exercise,
									duration,
									caloriesBurned: calories,
							  }
							: exercise
					),
				};
			} else {
				updatedDetails = {
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
			}
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
		setIsLoading(true);
		let response =
			activityFormType === "exercise"
				? await addExercise({
						exerciseType: handleType(type),
						duration: duration,
						caloriesBurned: calories,
				  })
				: await addMeal({
						mealType: type,
						ingredients: ingredients,
						caloriesConsumed: calories,
				  });
		setIsLoading(false);
		if (response.status === 200) {
			const newActivity =
				activityFormType === "exercise"
					? {
							exerciseType: handleType(type),
							duration,
							caloriesBurned: calories,
					  }
					: { mealType: type, ingredients, caloriesConsumed: calories };

			const activityDetailsType = activityFormType === "exercise" ? "exerciseDetails" : "mealDetails";

			setAllDetails({
				...allDetails,
				[activityDetailsType]: [...(allDetails[activityDetailsType] || []), newActivity],
			});
			showToast("success", `${formType.toLowerCase()} added successfully`);
			setActivityDetails(initialValue);
			setButtonText("Add");
		} else {
			showToast("error", "some error occured while Adding Activity!");
		}
	};

	const handleActivitySubmission = (event) => {
		event.preventDefault();
		if (buttonText === "Add") {
			addActivity();
		} else {
			updateActivity();
		}
	};

	return (
		<>
			<h2 className="form-heading">{activityHeading}</h2>
			<form onSubmit={handleActivitySubmission}>
				<div className="field">
					<label htmlFor="activity">{activityText}</label>
					<select name="type" id="activity" value={activityDetails["type"]} onChange={handleInputChange} required>
						<option value="">{optionText}</option>
						{options.map((data, index) => (
							<option key={index} value={data.toLowerCase()}>
								{data}
							</option>
						))}
					</select>
				</div>
				<div className="field">
					{activityFormType === "exercise" ? (
						<>
							<label htmlFor="duration">Duration (min)</label>
							<input
								type="number"
								id="duration"
								name="duration"
								value={activityDetails["duration"]}
								onChange={handleInputChange}
								min="1"
								max="1440"
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
								onChange={handleInputChange}
								placeholder="Meal ingredients"
								required
							/>
						</>
					)}
				</div>
				<div className="field">
					<label htmlFor="calories">{calorieText}</label>
					<input
						type="number"
						id="calories"
						name="calories"
						value={activityDetails["calories"]}
						onChange={handleInputChange}
						min="1"
						max="20000"
						placeholder={caloriePlaceholder}
						required
					/>
				</div>

				<button className="activity-submit-btn">
					{activityFormType === "exercise" ? `${buttonText} Exercise` : `${buttonText} Meal`}
				</button>
			</form>
			{isLoading && <Loader />}
		</>
	);
}

export default AddActivityForm;

AddActivityForm.propTypes = {
	activityFormType: PropTypes.string,
	allDetails: PropTypes.object,
	setAllDetails: PropTypes.func,
};
