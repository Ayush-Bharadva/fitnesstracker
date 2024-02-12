import { useMemo } from "react";
import PropTypes from "prop-types";
import { MdDelete } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import Ingredient from "../../assets/icons/Ingredient.png";
import calories from "../../assets/icons/consumedCalorie.png";
import fireIcon from "../../assets/icons/fire-icon-image.png";
import "./RecordCard.scss";
import { capitalizeFirstLetter } from "../../utils/helper";

function Record({ index, data, isReadonly, onDelete, isExercise = false }) {
	const recordObj = useMemo(() => {
		if (isExercise) {
			return {
				recordType: "exercise",
				recordBgClass: "exercise-card-bg",
				recordTitle: data.exerciseType === "weight_lifting" ? "Weight Lifting" : data.exerciseType
			};
		} else {
			return {
				recordType: "meal",
				recordBgClass: "meal-card-bg",
				recordTitle: data.mealType
			};
		}
	}, [isExercise, data]);

	const { recordType, recordBgClass, recordTitle } = recordObj;

	const recTitle = capitalizeFirstLetter(recordTitle);

	return (
		<div
			key={index}
			className={`record-container ${recordBgClass}`}>
			<div className={`${recordType}-record-card`}>
				<div>
					<p className={`${recordType}-record-title`}>{recTitle}</p>
				</div>
				<div className="record-info">
					<p>
						{isExercise ? (
							<FaRegClock className="clock-icon" />
						) : (
							<img
								src={Ingredient}
								alt=""
							/>
						)}
						<span>{isExercise ? `${data.duration} Min` : data.ingredients}</span>
					</p>
					<p>
						<img
							src={isExercise ? fireIcon : calories}
							alt=""
						/>
						<span>{`${isExercise ? data.caloriesBurned : data.caloriesConsumed} Cal`}</span>
					</p>
				</div>
			</div>
			{!isReadonly && (
				<MdDelete
					className="delete-record"
					onClick={() => onDelete(data[isExercise ? "exerciseType" : "mealType"], isExercise)}
				/>
			)}
		</div>
	);
}

Record.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
	isReadonly: PropTypes.bool,
	onDelete: PropTypes.func,
	isExercise: PropTypes.bool
};

export default Record;
