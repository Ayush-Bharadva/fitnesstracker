import React from "react";
import RecordTile from "../../components/Common/RecordTile";

function ExerciseOfDay({ day }) {
	return (
		<div className="record-card flex-column">
			<p className="title">Exercise performed</p>
			<RecordTile>
				<p>Exercise Type :</p>
				<p>Exercise Duration :</p>
				<p>Calories Burned :</p>
			</RecordTile>
		</div>
	);
}

export default ExerciseOfDay;
