import React from "react";
import "./Home.scss";
import "../../global.scss";
import { FiChevronRight } from "react-icons/fi";

function DayWiseRecord({ totalDays, handleDayClick }) {
	return (
		<div className="full-height overflow-auto">
			<h2 className="text-left margin-y-1">Daily Records</h2>
			{totalDays.map((day, index) => (
				<div
					key={index}
					className="day-wise-record flex"
					onClick={() => handleDayClick(index)}>
					{day} <FiChevronRight />
				</div>
			))}
		</div>
	);
}

export default DayWiseRecord;
