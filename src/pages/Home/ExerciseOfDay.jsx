import React from "react";
import RecordTile from "../../components/Common/RecordTile";

function ExerciseOfDay({ day }) {
	return (
		<div className="main-container home-record flex-column">
			<p>Exercise At : {day}</p>
			<RecordTile>
				<p>Exercise Type :</p>
				<p>Exercise Duration :</p>
				<p>Calories Burned :</p>
			</RecordTile>
		</div>
	);
}

export default ExerciseOfDay;
