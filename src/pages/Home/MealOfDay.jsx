import React from "react";
import RecordTile from "../../components/Common/RecordTile";
import "./Home.scss";

function MealOfDay({ day }) {
	return (
		<div className="record-card flex-column">
			<h3 className="title">Meal </h3>
			<RecordTile>
				<p>Meal Type :</p>
				<p>Meal Ingredients :</p>
				<p>Calories Consumed :</p>
			</RecordTile>
		</div>
	);
}

export default MealOfDay;
