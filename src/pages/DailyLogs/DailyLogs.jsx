import { useEffect, useState } from "react";
import { getDetailsFromDateService } from "../../services/services";
import RecordCard from "../../components/Common/RecordCard";
import "react-toastify/dist/ReactToastify.css";
import AddActivityForm from "../../components/Common/AddActivityForm";
import Loader from "../../components/Common/Loader";
import WeightAndWaterTracker from "./WeightAndWaterTracker";
import { getTodaysDate, showToast } from "../../utils/helper";
import "./DailyLogs.scss";

function DailyLogs() {
	const [todaysDetails, setTodaysDetails] = useState({});
	const [selectedDate, setSelectedDate] = useState(getTodaysDate());
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchTodaysDetails = async () => {
			try {
				const response = await getDetailsFromDateService({
					date: selectedDate
				});
				setIsLoading(false);
				if (response.status === 200) {
					const allData = { ...response.data };
					setTodaysDetails(allData);
				} else if (response.status === 500) {
					showToast("error", response.message);
				}
			} catch (error) {
				setIsLoading(false);
				showToast("error", "error fetching records!!");
			}
		};
		fetchTodaysDetails();
	}, [selectedDate]);

	const handleDateChange = async ({ target }) => {
		setSelectedDate(target.value);
	};

	const isLogReadOnly = selectedDate === getTodaysDate() ? false : true;

	return (
		<main className="daily-logs-section">
			<section id="activity-form-section">
				<div className="date-wrapper">
					<div className="dailylog-date-section">
						<input
							type="date"
							name="name"
							id="date"
							value={selectedDate}
							onChange={handleDateChange}
							max={getTodaysDate()}
						/>
					</div>
				</div>
				<div className="form-container">
					<AddActivityForm
						isExercise={true}
						allDetails={todaysDetails}
						setAllDetails={setTodaysDetails}
					/>
				</div>
				<div className="form-container">
					<AddActivityForm
						isExercise={false}
						allDetails={todaysDetails}
						setAllDetails={setTodaysDetails}
					/>
				</div>
			</section>
			<section id="track-activity-section">
				<WeightAndWaterTracker
					heading={"Today's Weight"}
					title={"Weight (Kgs)"}
					type={"weight"}
					value={todaysDetails?.weightDetails?.dailyWeight}
					setAllDetails={setTodaysDetails}
				/>
				<WeightAndWaterTracker
					heading={"Water Drunk Today"}
					title={"Water Intake (Ltrs)"}
					type={"water"}
					value={todaysDetails?.waterDetails?.waterIntake}
					setAllDetails={setTodaysDetails}
				/>
			</section>

			{isLoading ? (
				<Loader />
			) : (
				<RecordCard
					allDetails={todaysDetails}
					setAllDetails={setTodaysDetails}
					isReadonly={isLogReadOnly}
				/>
			)}
		</main>
	);
}

export default DailyLogs;
