import React, { useEffect, useState } from "react";
import "./DailyGoals.scss";
import {
	addWeightService,
	editWeightService,
	getDetailsFromDateService,
} from "../../services/services";
import RecordCard from "../../components/Common/RecordCard";
import "react-toastify/dist/ReactToastify.css";
import AddActivityForm from "./AddActivityForm";
import { toast } from "react-toastify";

function DailyGoals() {
	const [allDetails, setAllDetails] = useState(null);
	const [weightInfo, setWeightInfo] = useState("");
	console.log(weightInfo);
	const [inputDisabled, setInputDisabled] = useState(
		weightInfo ? true : false
	);
	console.log("inputDisabled :", inputDisabled);

	const showToast = (type, message) => {
		toast[type](message, { position: toast.POSITION.TOP_RIGHT });
	};

	const handleWeightInfo = async (type) => {
		console.log("weightInfo :", weightInfo);
		setInputDisabled(type === "edit" ? false : true);

		let response;

		if (weightInfo === "") {
			response = await addWeightService(parseInt(weightInfo));
		} else {
			response = await editWeightService(parseInt(weightInfo));
		}

		if (response.status === 200) {
			showToast(
				"success",
				type === "add" ? "Weight logged!" : "Weight Updated!"
			);
			setInputDisabled(true);
		}
	};

	const weightActionBtn = weightInfo ? (
		<button
			className="weight-action-btn"
			onClick={() => handleWeightInfo("edit")}>
			Edit
		</button>
	) : (
		<button
			className="weight-action-btn"
			onClick={() => handleWeightInfo("save")}>
			Save
		</button>
	);

	const handleWeightChange = (e) => {
		setWeightInfo(e.target.value);
	};

	useEffect(() => {
		const fetchAllRecords = async () => {
			try {
				const date = new Date();
				const year = date.getFullYear().toString();
				const month = (date.getMonth() + 1).toString().padStart(2, "0");
				const day = date.getDate().toString().padStart(2, "0");
				const formatedDate = `${year}-${month}-${day}`;

				const response = await getDetailsFromDateService({
					date: formatedDate,
				});

				if (response.status === 200) {
					const allData = { ...response.data };
					setAllDetails(allData);
					setWeightInfo(allData.weightDetails.dailyWeight || "");
				}
			} catch (error) {
				console.log("error fetching all records :", error);
			}
		};
		fetchAllRecords();
	}, []);

	return (
		<div className="daily-goals-container">
			<section id="activity-form-section">
				<div className="form-container">
					<AddActivityForm
						isExercise={true}
						allDetails={allDetails}
						setAllDetails={setAllDetails}
					/>
				</div>
				<div className="form-container">
					<AddActivityForm
						isExercise={false}
						allDetails={allDetails}
						setAllDetails={setAllDetails}
					/>
				</div>
			</section>
			<section id="weight-tracking-section">
				<h3>Today's Weight</h3>
				<div className="weight-tracker-container">
					<p className="weight">Weight</p>
					<div className="actions">
						<input
							type="text"
							value={weightInfo}
							onChange={handleWeightChange}
							disabled={inputDisabled}
							placeholder="Today's Weight (Kgs)"
						/>
						{weightActionBtn}
					</div>
				</div>
			</section>

			<RecordCard allDetails={allDetails} setAllDetails={setAllDetails} />
		</div>
	);
}

export default DailyGoals;
