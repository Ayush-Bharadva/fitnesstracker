import { useEffect, useState } from "react";
import { getDetailsFromDate } from "../../services/services";
import RecordCard from "../../components/Common/Records/RecordCard";
import "react-toastify/dist/ReactToastify.css";
import AddActivityForm from "../../components/DailyLogs/AddActivityForm";
import Loader from "../../components/Common/Loader/Loader";
import Tracker from "../../components/DailyLogs/Tracker";
import { getTodaysDate, showToast } from "../../utils/helper";
import "./DailyLogs.scss";
import { ActivityType, TrackerType } from "../../utils/constants";

function DailyLogs() {
	const [todaysDetails, setTodaysDetails] = useState({});
	const [selectedDate, setSelectedDate] = useState(getTodaysDate());
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchTodaysDetails = async () => {
			try {
				const response = await getDetailsFromDate({
					date: selectedDate,
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

	const isCurrentDate = selectedDate === getTodaysDate() ? true : false;

	return (
		<main className="daily-logs-section">
			<div className="date-wrapper">
				<div className="daily-log-date-section">
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
			{isCurrentDate && (
				<>
					<section id="activity-form-section">
						<div className="form-container">
							<AddActivityForm
								activityFormType={ActivityType.exercise}
								allDetails={todaysDetails}
								setAllDetails={setTodaysDetails}
							/>
						</div>
						<div className="form-container">
							<AddActivityForm
								activityFormType={ActivityType.meal}
								allDetails={todaysDetails}
								setAllDetails={setTodaysDetails}
							/>
						</div>
					</section>
					<section id="track-activity-section">
						<Tracker
							type={TrackerType.weight}
							setAllDetails={setTodaysDetails}
							value={todaysDetails?.weightDetails?.dailyWeight}
						/>
						<Tracker
							type={TrackerType.water}
							setAllDetails={setTodaysDetails}
							value={todaysDetails?.waterDetails?.waterIntake}
						/>
					</section>
				</>
			)}
			{isLoading ? (
				<Loader />
			) : (
				<RecordCard
					allDetails={todaysDetails}
					setAllDetails={setTodaysDetails}
					isReadonly={!isCurrentDate} />
			)}
		</main>
	);
}

export default DailyLogs;
