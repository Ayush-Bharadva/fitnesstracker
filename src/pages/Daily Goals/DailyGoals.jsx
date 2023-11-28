import React, { useEffect, useState } from "react";
import "./DailyGoals.scss";
import {
	addWaterService,
	addWeightService,
	editWaterService,
	editWeightService,
	getDetailsFromDateService,
} from "../../services/services";
import RecordCard from "../../components/Common/RecordCard";
import "react-toastify/dist/ReactToastify.css";
import AddActivityForm from "./AddActivityForm";
import { toast } from "react-toastify";
import Loader from "../../components/Common/Loader";

function DailyGoals() {
	const [allDetails, setAllDetails] = useState({});
	const { weightDetails, waterDetails } = allDetails;

	const [weightInfo, setWeightInfo] = useState("");
	const [weightButtonType, setWeightButtonType] = useState("Save");

	const [waterInfo, setWaterInfo] = useState("");
	const [waterButtonType, setWaterButtonType] = useState("Save");
	const [loading, setLoading] = useState(false);

	const showToast = (type, message) => {
		toast[type](message, { position: toast.POSITION.TOP_RIGHT });
	};

	const handleWeightInfo = async () => {
		// console.log(weightInfo);
		setWeightButtonType("Edit");

		try {
			setLoading(true);
			let response = !weightDetails?.dailyWeight
				? await addWeightService(Number(weightInfo))
				: await editWeightService(Number(weightInfo));
			setLoading(false);
			// console.log(response);
			if (response.status === 200) {
				setAllDetails((prevDetails) => ({
					...prevDetails,
					weightDetails: { dailyWeight: weightInfo },
				}));
				showToast("success", "Weight Updated!");
			}
		} catch (error) {
			console.error("error updating weight :", error);
			showToast("error", "An error occurred while updating weight");
		}
	};

	const handleWaterInfo = async () => {
		setWaterButtonType("Edit");
		try {
			setLoading(true);
			let response = !waterDetails?.waterIntake
				? await addWaterService(Number(waterInfo))
				: await editWaterService(Number(waterInfo));
			setLoading(false);
			if (response.status === 200) {
				setAllDetails((prevDetails) => ({
					...prevDetails,
					waterDetails: { waterIntake: waterInfo },
				}));
				showToast("success", "water Updated!!");
			}
		} catch (error) {
			console.error("error updating water track :", error);
			showToast("error", "An error occurred while updating water data");
		}
	};

	const handleWeightChange = ({ target }) => {
		setWeightInfo(Number(target.value));
	};

	const handleWaterChange = ({ target }) => {
		setWaterInfo(target.value);
	};

	const weightActionButton =
		weightButtonType === "Edit" ? (
			<button
				className="weight-action-btn"
				onClick={() => setWeightButtonType("Save")}>
				Edit
			</button>
		) : (
			<button className="weight-action-btn" onClick={handleWeightInfo}>
				Save
			</button>
		);

	const WaterActionButton =
		waterButtonType === "Edit" ? (
			<button
				className="water-action-btn"
				onClick={() => setWaterButtonType("Save")}>
				Edit
			</button>
		) : (
			<button className="water-action-btn" onClick={handleWaterInfo}>
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
				setLoading(true);
				const response = await getDetailsFromDateService({
					date: formatedDate,
				});
				setLoading(false);
				if (response.status === 200) {
					const allData = { ...response.data };
					setAllDetails(allData);
					if (allData.weightDetails?.dailyWeight) {
						setWeightInfo(allData.weightDetails.dailyWeight);
						setWeightButtonType("Edit");
					}
					if (allData.waterDetails?.waterIntake) {
						setWaterInfo(allData.waterDetails.waterIntake);
						setWaterButtonType("Edit");
					}
				}
			} catch (error) {
				console.log("error fetching all records :", error);
			}
		};
		fetchAllRecords();
	}, []);

	return (
		<main className="daily-goals-section">
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
			<section id="track-activity-section">
				<div id="weight-tracking-section">
					<h3>Today's Weight</h3>
					<div className="weight-tracker-container">
						<h3 className="weight">Weight (Kgs)</h3>
						<div className="actions">
							<input
								type="text"
								value={weightInfo}
								onChange={handleWeightChange}
								disabled={
									weightButtonType === "Edit" ? true : false
								}
								placeholder="Today's Weight (Kgs)"
							/>
							{weightActionButton}
						</div>
					</div>
				</div>
				<div id="water-tracking-section">
					<h3>Water Drunk Today</h3>
					<div className="water-tracker-container">
						<h3>Water (Ltrs)</h3>
						<div className="actions">
							<input
								type="text"
								value={waterInfo}
								onChange={handleWaterChange}
								placeholder="Water Drunk"
								disabled={
									waterButtonType === "Edit" ? true : false
								}
							/>
							{WaterActionButton}
						</div>
					</div>
				</div>
			</section>

			{loading ? (
				<Loader />
			) : (
				<div className="records-container">
					<h1 className="dg-activity-heading">
						Today's Logged Activities :{" "}
					</h1>
					<RecordCard
						allDetails={allDetails}
						setAllDetails={setAllDetails}
						loading={loading}
					/>
				</div>
			)}
		</main>
	);
}

export default DailyGoals;
