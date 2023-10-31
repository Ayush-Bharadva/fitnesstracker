import React from "react";
import RecordTile from "../../components/Common/RecordTile";

function MealOfDay({ day }) {
	return (
		<div className="main-container home-record flex-column">
			<p>Meal At : {day}</p> <RecordTile />
		</div>
	);
}

export default MealOfDay;
