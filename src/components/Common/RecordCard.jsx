import PropTypes from "prop-types";
import { deleteExercise, deleteMeal } from "../../services/services";
import "../../global.scss";
import { showToast } from "../../utils/helper";
import Record from "./Record";
import "./RecordCard.scss";
import DeleteActivityModal from "./DeleteActivityModal";
import { useState } from "react";

function RecordCard({ allDetails, setAllDetails, isReadonly }) {
	const [showModal, setShowModal] = useState(false);
	const [selectedRecord, setSelectedRecord] = useState({});

	const { exerciseDetails, mealDetails } = allDetails;

	const onConfirmDelete = async () => {
		const { type, isExercise } = selectedRecord;
		try {
			const service = isExercise ? deleteExercise : deleteMeal;
			const response = await service(type);

			if (response.status === 200) {
				const key = isExercise ? "exerciseDetails" : "mealDetails";
				const updatedDetails = {
					[key]: allDetails[key].filter((item) => item[isExercise ? "exerciseType" : "mealType"] !== type),
				};
				showToast("success", "Activity deleted!!");
				setAllDetails({ ...allDetails, ...updatedDetails });
			}
		} catch (error) {
			showToast("error", "Error deleting activity. Please try again.");
		} finally {
			setShowModal(false);
		}
	};

	const onDelete = (type, isExercise) => {
		setShowModal(true);
		setSelectedRecord({ type, isExercise });
	};

	const onCancel = () => {
		setShowModal(false);
	};

	const isTrackingWorkout = !exerciseDetails?.length && !mealDetails?.length;

	return (
		<>
			{isTrackingWorkout && <h1 className="no-activity-heading text-center">No Logs Currently to display!!</h1>}
			<div className="record-card">
				<div className="exercise-record-container">
					{exerciseDetails?.length > 0 && (
						<>
							<h1 className="dg-activity-heading text-center">Exercise Performed</h1>
							{exerciseDetails?.map((exercise, index) => (
								<Record
									key={index}
									data={exercise}
									index={index}
									isReadonly={isReadonly}
									onDelete={onDelete}
									isExercise
								/>
							))}
						</>
					)}
				</div>
				<div className="meal-record-container">
					{mealDetails?.length > 0 && (
						<>
							<h1 className="dg-activity-heading text-center">Meals Taken</h1>
							{mealDetails.map((meal, index) => (
								<Record key={index} data={meal} index={index} isReadonly={isReadonly} onDelete={onDelete} />
							))}
						</>
					)}
				</div>
			</div>
			{/* <ToastContainer /> */}
			{showModal && <DeleteActivityModal onConfirmDelete={onConfirmDelete} onCancel={onCancel} />}
		</>
	);
}

export default RecordCard;

RecordCard.propTypes = {
	allDetails: PropTypes.object,
	setAllDetails: PropTypes.func,
	isReadonly: PropTypes.bool,
};
