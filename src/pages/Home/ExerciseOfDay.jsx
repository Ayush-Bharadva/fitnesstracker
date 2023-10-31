import React from "react";
import RecordTile from "../../components/Common/RecordTile";

function ExerciseOfDay({ day }) {
	return (
		<div className="main-container home-record flex-column">
			<p>Exercise @ : {day}</p>
			<RecordTile />
		</div>
	);
}

export default ExerciseOfDay;
