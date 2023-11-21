import React, { Fragment } from "react";
import "./RecordCard.scss";
import {
	deleteExerciseService,
	deleteMealService,
} from "../../services/services";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import fireIcon from "../../assets/icons/fire-icon-image.png";
import Ingredient from "../../assets/icons/Ingredient.png";
import calories from "../../assets/icons/calories.png";

function RecordCard({ allDetails, setAllDetails }) {
	const { exerciseDetails, mealDetails } = {
		...allDetails,
	};

	const showToast = (type = "success", message) => {
		toast[type](message, {
			position: toast.POSITION.TOP_RIGHT,
		});
	};

	const handleDeleteActivity = async (type, isExercise) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					let response;
					if (isExercise) {
						response = await deleteExerciseService(type);
					} else {
						response = await deleteMealService(type);
					}

					if (response.status === 200) {
						showToast("success", "Activity deleted successfully");

						const updatedDetails = isExercise
							? {
									exerciseDetails:
										allDetails.exerciseDetails.filter(
											(exercise) =>
												exercise.exerciseType !== type
										),
							  }
							: {
									mealDetails: allDetails.mealDetails.filter(
										(meal) => meal.mealType !== type
									),
							  };

						setAllDetails({ ...allDetails, ...updatedDetails });
					}
				} catch (error) {
					console.error("Error deleting activity:", error);
					showToast(
						"error",
						"Error deleting activity. Please try again."
					);
				}
			}
		});
	};

	return (
		<>
			<div className="record-card">
				<div className="exercise-record-container">
					{exerciseDetails?.map((exercise, index) => (
						<Fragment key={index}>
							<div className="record-container exercise-card-bg">
								<div className="exercise-record-card">
									<div>
										<p className="record-title">
											{exercise.exerciseType ===
											"Weight_lifting"
												? "Weight Lifting"
												: exercise.exerciseType || ""}
										</p>
									</div>
									<div className="record-info">
										<p>
											<FaRegClock className="clock-icon" />{" "}
											<span>{exercise.duration} Min</span>
										</p>
										<p>
											<img src={fireIcon} alt="" />
											<span>
												{exercise.caloriesBurned} Cal
											</span>
										</p>
									</div>
								</div>
								<MdDelete
									className="delete-record"
									onClick={() =>
										handleDeleteActivity(
											exercise.exerciseType,
											true
										)
									}
								/>
							</div>
						</Fragment>
					))}
				</div>
				<div className="meal-record-container">
					{mealDetails?.length > 0 &&
						mealDetails.map((meal, index) => (
							<Fragment key={index}>
								<div className="record-container meal-card-bg">
									<div className="meal-record-card">
										<div>
											<p className="meal-record-title">
												{meal.mealType}
											</p>
										</div>
										<div className="record-info">
											<p>
												{" "}
												<img src={Ingredient} alt="" />
												<span>{meal.ingredients}</span>
											</p>
											<p>
												<img src={calories} alt="" />
												<span>
													{meal.caloriesConsumed} Cal
												</span>
											</p>
										</div>
									</div>
									<MdDelete
										className="delete-record"
										onClick={() =>
											handleDeleteActivity(
												meal.mealType,
												true
											)
										}
									/>
								</div>
							</Fragment>
						))}
				</div>
			</div>
			<ToastContainer />
		</>
	);
}

/*
	allDetails = {
		exerciseDetails : [
			{
				exerciseType:Running,
				duration:2,
				caloriesBurned:10,
			},
			{
				exerciseType:Walking,
				duration:20,
				caloriesBurned:50,
			}
		],
		mealDetails : [
			{
				mealType:Breakfast,
				ingredients:fries,
				caloriesConsumed:100,
			},
			{
				mealType:Lunch,
				ingredients:pasta,
				caloriesConsumed:150,
			}
		]
	}
*/

export default RecordCard;
