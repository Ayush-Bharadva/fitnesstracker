import React from "react";
import { MdDelete } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import Ingredient from "../../assets/icons/Ingredient.png";
import calories from "../../assets/icons/consumedCalorie.png";
import fireIcon from "../../assets/icons/fire-icon-image.png";

function Record({ index, data, isReadonly, onDelete, isExercise }) {
	const recordType = isExercise ? "exercise" : "meal";
	const recordBgClass = isExercise ? "exercise-card-bg" : "meal-card-bg";
	const recordTitle = isExercise
		? data.exerciseType === "Weight_lifting"
			? "Weight Lifting"
			: data.exerciseType
		: data.mealType;

	return (
		<div key={index} className={`record-container ${recordBgClass}`}>
			<div className={`${recordType}-record-card`}>
				<div>
					<p className={`${recordType}-record-title`}>
						{recordTitle}
					</p>
				</div>
				<div className="record-info">
					<p>
						{isExercise ? (
							<FaRegClock className="clock-icon" />
						) : (
							<img src={Ingredient} alt="" />
						)}
						<span>
							{isExercise
								? `${data.duration} Min`
								: data.ingredients}
						</span>
					</p>
					<p>
						<img src={isExercise ? fireIcon : calories} alt="" />
						<span>{`${
							isExercise
								? data.caloriesBurned
								: data.caloriesConsumed
						} Cal`}</span>
					</p>
				</div>
			</div>
			{!isReadonly && (
				<MdDelete
					className="delete-record"
					onClick={() =>
						onDelete(
							data[isExercise ? "exerciseType" : "mealType"],
							isExercise
						)
					}
				/>
			)}
		</div>
	);
}

export default Record;
