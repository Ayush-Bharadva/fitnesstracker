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
import AddActivityForm from "../../components/Common/AddActivityForm";
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
						setWeightInfo(allData.weightDetails?.dailyWeight);
						setWeightButtonType("Edit");
					}
					if (allData.waterDetails?.waterIntake) {
						setWaterInfo(allData.waterDetails?.waterIntake);
						setWaterButtonType("Edit");
					}
				} else if (response.code === 500) {
					showToast("error", response.message);
				}
			} catch (error) {
				setLoading(false);
				showToast("error", "error fetching records!!");
			}
		};
		fetchAllRecords();
	}, []);

	const handleWeightInfo = async () => {
		setWeightButtonType("Edit");

		try {
			setLoading(true);
			const response = !weightDetails?.dailyWeight
				? await addWeightService(Number(weightInfo))
				: await editWeightService(Number(weightInfo));
			setLoading(false);
			if (response.status === 200) {
				setAllDetails((prevDetails) => ({
					...prevDetails,
					weightDetails: { dailyWeight: weightInfo },
				}));
				showToast("success", "Weight Updated!");
			} else if (response.code === 500) {
				showToast("error", response.message);
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
			setLoading(false);
			console.error("error updating water track :", error);
			showToast("error", "An error occurred while updating water data");
		}
	};

	const handleWeightChange = ({ target: { value } }) => {
		setWeightInfo(value);
	};

	const handleWaterChange = ({ target: { value } }) => {
		setWaterInfo(value);
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
						<h3>Water Intake (Ltrs)</h3>
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
				<RecordCard
					allDetails={allDetails}
					setAllDetails={setAllDetails}
				/>
			)}
		</main>
	);
}

export default DailyGoals;
