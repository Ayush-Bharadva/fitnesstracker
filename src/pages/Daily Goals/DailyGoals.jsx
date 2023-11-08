import React, { Fragment, useEffect, useState } from "react";
import LogExercise from "./LogExercise";
import LogMeals from "./LogMeals";
import "../../global.scss";
import "./DailyGoals.scss";
import {
	addExerciseService,
	addMealService,
	deleteMealService,
	getDetailsFromDate,
} from "../../services/services";
import RecordCard from "../../components/Common/RecordCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddActivityForm from "./addActivityForm";

function DailyGoals() {
	const showAddToast = (type = "success") => {
		toast[type]("Exercise added..", {
			position: toast.POSITION.TOP_RIGHT,
		});
	};

	const [exerciseRecords, setExerciseRecords] = useState([]);
	const [mealRecords, setMealRecords] = useState([]);

	const [allDetails, setAllDetails] = useState(null);

	useEffect(() => {
		const fetchAllRecords = async () => {
			const date = new Date();
			const year = date.getFullYear().toString();
			const month = (date.getMonth() + 1).toString().padStart(2, "0");
			const day = date.getDate().toString().padStart(2, "0");
			const formatedDate = `${year}-${month}-${day}`;

			const response = await getDetailsFromDate({ date: formatedDate });
			console.log(response);

			if (response.status === 200) {
				console.log(response.data);
				const allData = { ...response.data };
				console.log(allData);
				setAllDetails(allData);
			}
		};
		fetchAllRecords();
	}, []);

	const addExercise = async (exerciseInfo) => {
		console.log(exerciseInfo);
		const response = await addExerciseService(exerciseInfo);
		if (response.status === 200) {
			showAddToast("error");

			if (exerciseRecords?.length === 0) {
				setExerciseRecords([...exerciseRecords, exerciseInfo]);
			}

			if (exerciseRecords?.length > 0) {
				const isDuplicateExercise = exerciseRecords.some(
					(data) => data.exerciseType === exerciseInfo.exerciseType
				);
				if (!isDuplicateExercise) {
					setExerciseRecords([...exerciseRecords, exerciseInfo]);
					console.log("exercise records :", exerciseRecords);
				} else {
					console.log("exercise type already added");
				}
			}
		} else if (response.status === 409) {
			// showDuplicateToast();
			console.log("exercise added already..");
		}
	};

	const addMeals = async (mealInfo) => {
		console.log(mealInfo);

		const response = await addMealService(mealInfo);
		console.log(response);

		if (response.status === 200) {
			showAddToast();

			if (mealRecords?.length === 0) {
				setMealRecords([...mealRecords, mealInfo]);
			}

			if (mealRecords?.length > 0) {
				const isDuplicateMeal = mealRecords.some(
					(data) => data.mealType === mealInfo.mealType
				);
				if (!isDuplicateMeal) {
					setMealRecords([...mealRecords, mealInfo]);
					console.log("meal Records :", mealRecords);
				} else {
					console.log("meal type already added");
				}
			}
		}
	};

	const editMeals = (mealInfo) => {};

	const deleteMeal = async () => {
		const response = await deleteMealService();
		if (response.status === 200) {
			console.log("meal Deleted successfully");
		}
	};

	const buttonDisabled = true;

	console.log("allDetails :", allDetails);
	return (
		<div className="daily-goals-container">
			<AddActivityForm isExercise={true} addExercise={addExercise} />
			<AddActivityForm isExercise={false} addMeals={addMeals} />

			{/* <div className="flex">
				<LogExercise addExercise={addExercise} />
				<LogMeals addMeals={addMeals} />
			</div> */}

			<div className="flex gap-1">
				<RecordCard allDetails={allDetails} />
				{/* <RecordCard allDetails={allDetails} /> */}
			</div>

			{/* <div className="daily-records">
				<h2 className="margin-bottom-1">Records</h2>
				<div className="my-records-container">
					{exerciseRecords?.length > 0 ? (
						<div className="my-exercise-records">
							<h4 className="margin-bottom-1">your exercises</h4>
							{exerciseRecords?.map((data) => (
								<Fragment key={data.exerciseType}>
									<p>Exercise Type : {data.exerciseType}</p>
									<p>Duratin : {data.duration}</p>
									<p>
										Calories Burned : {data.caloriesBurned}
									</p>
									<div className="spacer"></div>
								</Fragment>
							))}
						</div>
					) : (
						<p>no any Exercises added yet..</p>
					)}
					{mealRecords?.length > 0 ? (
						<div className="my-meal-records">
							<h4 className="margin-bottom-1">your meals</h4>
							{mealRecords?.map((data) => (
								<Fragment key={data.mealType}>
									<p>Meal Type : {data.mealType}</p>
									<p>Ingredients : {data.ingredients}</p>
									<p>
										Calories Consumed :{" "}
										{data.caloriesConsumed}
									</p>
									<div className="spacer"></div>
								</Fragment>
							))}
						</div>
					) : (
						<p>no any Meals added yet..</p>
					)}
				</div>
			</div> */}
			<ToastContainer />
		</div>
	);
}

export default DailyGoals;
