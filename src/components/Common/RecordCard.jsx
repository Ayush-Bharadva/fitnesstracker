import React, { Fragment } from "react";
import "./RecordCard.scss";
import {
	deleteExerciseService,
	deleteMealService,
} from "../../services/services";
import { ToastContainer, toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import { ImFire } from "react-icons/im";
import fireIcon from "../../assets/icons/fire-icon-image.png";

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
									<div className="">
										<p className="record-title">
											{exercise.exerciseType || ""}
										</p>
									</div>
									<div className="record-info">
										<p className="">
											<FaRegClock className="clock-icon" />{" "}
											<span>{exercise.duration} Min</span>
										</p>
										<p className="">
											{/* <ImFire className="fire-icon" /> */}
											<img src={fireIcon} alt="" />
											<span>
												{exercise.caloriesBurned} Cal
											</span>
										</p>
									</div>
								</div>
								<MdDelete
									className="record-delete"
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
										<div className="record-info">
											<p className="record-type font-bold">
												MealType
											</p>
											<p>:</p>
											<p className="record-data">
												{meal.mealType}
											</p>
										</div>
										<div className="record-info">
											<p className="font-bold">
												Duration
											</p>
											<p>:</p>
											<p>{meal.ingredients}</p>
										</div>
										<div className="record-info">
											<p className="font-bold">
												Calories Burned
											</p>
											<p>:</p>
											<p>{meal.caloriesConsumed}</p>
										</div>
									</div>
									{/* <div className="actions"> */}
									<MdDelete
										className="record-delete"
										onClick={() =>
											handleDeleteActivity(
												exercise.exerciseType,
												true
											)
										}
									/>
									{/* <button
												className="record-delete"
												onClick={() =>
													handleDeleteActivity(
														meal.mealType,
														false
													)
												}>
												Delete
											</button> */}
									{/* </div> */}
								</div>
							</Fragment>
						))}
				</div>
			</div>
			<ToastContainer />
		</>
	);
}

export const DeleteConfirmation = ({
	showModal,
	hideModal,
	confirmModal,
	id,
	type,
	message,
}) => {
	return (
		<Modal show={showModal} onHide={hideModal}>
			<Modal.Header closeButton>
				<Modal.Title>Delete Confirmation</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="alert alert-danger">{message}</div>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="default" onClick={hideModal}>
					Cancel
				</Button>
				<Button variant="danger" onClick={() => confirmModal(type, id)}>
					Delete
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

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
