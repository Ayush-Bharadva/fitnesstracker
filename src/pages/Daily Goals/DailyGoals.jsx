import React, { useEffect, useState } from "react";
import "./DailyGoals.scss";
import { getDetailsFromDateService } from "../../services/services";
import RecordCard from "../../components/Common/RecordCard";
import "react-toastify/dist/ReactToastify.css";
import AddActivityForm from "../../components/Common/AddActivityForm";
import { toast } from "react-toastify";
import Loader from "../../components/Common/Loader";
import WeightAndWaterTracker from "./WeightAndWaterTracker";

function DailyGoals() {
	const [allDetails, setAllDetails] = useState({});
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
				} else if (response.status === 500) {
					showToast("error", response.message);
				}
			} catch (error) {
				setLoading(false);
				showToast("error", "error fetching records!!");
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
				<WeightAndWaterTracker
					heading={"Today's Weight"}
					title={"Weight (Kgs)"}
					type={"weight"}
					value={allDetails?.weightDetails?.dailyWeight}
					setAllDetails={setAllDetails}
				/>
				<WeightAndWaterTracker
					heading={"Water Drunk Today"}
					title={"Water Intake (Ltrs)"}
					type={"water"}
					value={allDetails?.waterDetails?.waterIntake}
					setAllDetails={setAllDetails}
				/>
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
