import { useEffect, useState } from "react";
import "./Dashboard.scss";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { getDetailsFromDate, getYearlyCaloriesDetail, getYearlyWeightDetail } from "../../services/services";
import RecordCard from "../../components/Common/Records/RecordCard";
import nullData from "../../assets/images/no-data.jpg";
import Loader from "../../components/Common/Loader/Loader";
import { getTodaysDate, showToast } from "../../utils/helper";
import { labels } from "../../utils/constants";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "top",
		},
	},
};

function Dashboard() {
	const [yearlyCalorieDetails, setYearlyCalorieDetails] = useState([]);
	const [yearlyWeightDetails, setYearlyWeightDetails] = useState([]);
	const [allRecordsByDate, setAllRecordsByDate] = useState({});
	const [selectedDate, setSelectedDate] = useState(getTodaysDate());
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [recordsResponse] = await Promise.all([
					getDetailsFromDate({ date: selectedDate }),
					fetchYearlyDetails(selectedDate),
				]);
				setIsLoading(false);
				if (recordsResponse.status === 200) {
					setAllRecordsByDate({ ...recordsResponse.data });
					setSelectedDate(selectedDate);
				} else {
					showToast("error", "Something went wrong!");
				}
			} catch (error) {
				showToast("error", "error fetching data!!");
			}
		};
		fetchData();
	}, [selectedDate]);

	const yearlyWeightData = {
		labels,
		datasets: [
			{
				label: "Weight",
				data: yearlyWeightDetails,
				backgroundColor: "rgba(45, 83, 51, 0.75)",
			},
		],
	};
	const yearlyCalorieData = {
		labels,
		datasets: [
			{
				label: "Calories",
				data: yearlyCalorieDetails,
				backgroundColor: "rgba(53, 162, 235, 0.75)",
			},
		],
	};

	const fetchRecordsForDate = async (formattedDate) => {
		try {
			const response = await getDetailsFromDate({
				date: formattedDate,
			});
			setIsLoading(false);
			if (response.status === 200) {
				setAllRecordsByDate({ ...response.data });
			}
		} catch (error) {
			showToast("error", "Error fetching records!!");
		}
	};

	const fetchYearlyDetails = async (date) => {
		const annualCalorieDetails = await getYearlyCaloriesDetail(date.substring(0, 4));
		setIsLoading(false);

		if (annualCalorieDetails.status === 200) {
			setYearlyCalorieDetails([...(annualCalorieDetails.data.map((data) => data.averageMonthlyCaloriesBurned) || [])]);
		}

		const annualWeightDetails = await getYearlyWeightDetail(date.substring(0, 4));
		if (annualWeightDetails.status === 200) {
			setYearlyWeightDetails([...(annualWeightDetails.data.map((data) => data.averageMonthlyWeight) || [])]);
		}
	};

	const handleDateChange = async ({ target }) => {
		setSelectedDate(target.value);
		if (selectedDate.substring(0, 4) !== target.value.substring(0, 4)) {
			fetchYearlyDetails(target.value);
		}
		fetchRecordsForDate(target.value);
	};

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<section id="dashboard-section">
					<h2 className="year-title">Annual Data Tracking (Year : {selectedDate?.substring(0, 4)})</h2>
					<div id="graph-section">
						<div className="select-date-section">
							<input
								type="date"
								name="name"
								id="date"
								value={selectedDate}
								onChange={handleDateChange}
								max={getTodaysDate()}
							/>
						</div>
						<div className="graph-container">
							<Bar className="graph" options={options} data={yearlyWeightData} />
							<Bar className="graph" options={options} data={yearlyCalorieData} />
						</div>
					</div>
					<div id="record-section">
						{allRecordsByDate.exerciseDetails || allRecordsByDate.mealDetails ? (
							<>
								<h2 className="day-title">Activity Records (Date : {selectedDate})</h2>
								<RecordCard allDetails={allRecordsByDate} isReadonly={true} />
							</>
						) : (
							<>
								<div className="no-data">
									<img src={nullData} alt="No Data" />
								</div>
								<h1>No Activity For Selected Date!!</h1>
							</>
						)}
					</div>
				</section>
			)}
		</>
	);
}

export default Dashboard;
