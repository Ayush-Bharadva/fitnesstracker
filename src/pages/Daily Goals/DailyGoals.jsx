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
	const [allDetails, setAllDetails] = useState({});
	const { weightDetails } = allDetails;

	const [weightInfo, setWeightInfo] = useState("");
	const [buttonType, setButtonType] = useState("Save");

	const showToast = (type, message) => {
		toast[type](message, { position: toast.POSITION.TOP_RIGHT });
	};

	const handleWeightInfo = async () => {
		console.log(weightInfo);
		setButtonType("Edit");

		try {
			let response = !weightDetails?.dailyWeight
				? await addWeightService(Number(weightInfo))
				: await editWeightService(Number(weightInfo));
			console.log(response);
			if (response.status === 200) {
				setAllDetails((prev) => ({
					...prev,
					weightDetails: { dailyWeight: weightInfo },
				}));
				showToast("success", "Weight Updated!");
			}
		} catch (error) {
			console.error("error updating weight :", error);
			showToast("error", "An error occurred while updating weight");
		}
	};

	const handleWeightChange = (e) => {
		setWeightInfo(Number(e.target.value));
	};

	const weightActionButton =
		buttonType === "Edit" ? (
			<button
				className="weight-action-btn"
				onClick={() => setButtonType("Save")}>
				Edit
			</button>
		) : (
			<button className="weight-action-btn" onClick={handleWeightInfo}>
				Save
			</button>
		);

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
					if (allData.weightDetails.dailyWeight) {
						setWeightInfo(allData.weightDetails.dailyWeight);
						setButtonType("Edit");
					}
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
					<h3 className="weight">Weight (Kgs)</h3>
					<div className="actions">
						<input
							type="text"
							value={weightInfo}
							onChange={handleWeightChange}
							disabled={buttonType === "Edit" ? true : false}
							placeholder="Today's Weight (Kgs)"
						/>
						{weightActionButton}
					</div>
				</div>
			</section>
			<RecordCard allDetails={allDetails} setAllDetails={setAllDetails} />
		</div>
	);
}

export default DailyGoals;
