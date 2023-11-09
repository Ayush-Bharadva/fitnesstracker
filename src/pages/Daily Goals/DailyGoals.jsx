import React, { useEffect, useState } from "react";
import "../../global.scss";
import "./DailyGoals.scss";
import { getDetailsFromDate } from "../../services/services";
import RecordCard from "../../components/Common/RecordCard";
import "react-toastify/dist/ReactToastify.css";
import AddActivityForm from "./addActivityForm";

function DailyGoals() {
	const [allDetails, setAllDetails] = useState(null);

	useEffect(() => {
		const fetchAllRecords = async () => {
			const date = new Date();
			const year = date.getFullYear().toString();
			const month = (date.getMonth() + 1).toString().padStart(2, "0");
			const day = date.getDate().toString().padStart(2, "0");
			const formatedDate = `${year}-${month}-${day}`;

			const response = await getDetailsFromDate({ date: formatedDate });
			console.log(response);

			if (response.status === 200) {
				console.log(response.data);
				const allData = { ...response.data };
				console.log(allData);
				setAllDetails(allData);
			}
		};
		fetchAllRecords();
	}, []);

	console.log("allDetails :", allDetails);
	return (
		<div className="daily-goals-container">
			<div className="flex">
				<AddActivityForm
					isExercise={true}
					allDetails={allDetails}
					setAllDetails={setAllDetails}
				/>
				<AddActivityForm
					isExercise={false}
					allDetails={allDetails}
					setAllDetails={setAllDetails}
				/>
			</div>

			<div className="flex gap-1">
				<RecordCard allDetails={allDetails} />
			</div>
		</div>
	);
}

export default DailyGoals;
