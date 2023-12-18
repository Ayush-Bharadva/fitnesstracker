import React, { useEffect, useState } from "react";
import "./Dashboard.scss";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {
	getDetailsFromDateService,
	getYearlyCaloriesDetailService,
	getYearlyWeightDetailService,
} from "../../services/services";
import RecordCard from "../../components/Common/RecordCard";
import noDataFound from "../../assets/icons/noDataFound.jpg";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Common/Loader";
import { formattedDate, showToast } from "../../utils/helper";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "top",
		},
	},
};

const labels = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

function Dashboard() {
	const navigate = useNavigate();

	const [yearlyCalorieDetails, setYearlyCalorieDetails] = useState(null);
	const [yearlyWeightDetails, setYearlyWeightDetails] = useState(null);
	const [allRecordsByDate, setAllRecordsByDate] = useState({});
	const [selectedDate, setSelectedDate] = useState(formattedDate());
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const [recordsResponse] = await Promise.all([
					getDetailsFromDateService({ date: selectedDate }),
					fetchYearlyDetails(selectedDate),
				]);
				setLoading(false);
				if (recordsResponse.status === 200) {
					setAllRecordsByDate({ ...recordsResponse.data });
					setSelectedDate(selectedDate);
				} else if (recordsResponse.status === 498) {
					navigate("/auth");
				} else {
					showToast("error", "Something went wrong!");
				}
			} catch (error) {
				showToast("error", "fetch data error!!");
			}
		};

		fetchData();
	}, []);

	const yearlyWeightData = {
		labels,
		datasets: [
			{
				label: "Weight",
				data:
					yearlyWeightDetails?.map(
						({ averageMonthlyWeight }) => averageMonthlyWeight
					) || [],
				backgroundColor: "rgba(45, 83, 51, 0.75)",
			},
		],
	};
	const yearlyCalorieData = {
		labels,
		datasets: [
			{
				label: "Calories",
				data:
					yearlyCalorieDetails?.map(
						({ averageMonthlyCaloriesBurned }) =>
							averageMonthlyCaloriesBurned
					) || [],
				backgroundColor: "rgba(53, 162, 235, 0.75)",
			},
		],
	};

	const fetchAllRecords = async (formatedDate) => {
		try {
			const response = await getDetailsFromDateService({
				date: formatedDate,
			});
			setLoading(false);
			if (response.status === 200) {
				setAllRecordsByDate({ ...response.data });
			}
		} catch (error) {
			showToast("error", "Error fetching records!!");
		}
	};

	const fetchYearlyDetails = async (date) => {
		setLoading(true);
		const annualCalresponse = await getYearlyCaloriesDetailService(date);
		setLoading(false);

		if (annualCalresponse.status === 200) {
			setYearlyCalorieDetails([...annualCalresponse.data]);
		}

		const annualWeightresponse = await getYearlyWeightDetailService(date);
		if (annualWeightresponse.status === 200) {
			setYearlyWeightDetails([...annualWeightresponse.data]);
		}
	};

	const handleDateChange = async ({ target }) => {
		setSelectedDate(target.value);

		if (selectedDate.substring(0, 4) !== target.value.substring(0, 4)) {
			fetchYearlyDetails(target.value);
		}
		fetchAllRecords(target.value);
	};

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<section id="dashboard-section">
					<h2 className="year-title">
						Annual Data Tracking (Year :{" "}
						{selectedDate?.substring(0, 4)})
					</h2>
					<div id="graph-section">
						<div className="select-date-section">
							<input
								type="date"
								name="name"
								id="date"
								value={selectedDate}
								onChange={handleDateChange}
							/>
						</div>
						<div className="graph-container">
							<Bar
								className="graph"
								options={options}
								data={yearlyWeightData}
							/>
							<Bar
								className="graph"
								options={options}
								data={yearlyCalorieData}
							/>
						</div>
					</div>
					<div id="record-section">
						{allRecordsByDate.exerciseDetails ||
						allRecordsByDate.mealDetails ? (
							<>
								<h2 className="day-title">
									Activity Records (Date : {selectedDate})
								</h2>
								<RecordCard
									allDetails={allRecordsByDate}
									isReadonly={true}
								/>
							</>
						) : (
							<div className="no-data">
								<img src={noDataFound} alt="No Data" />
								<h1>No Activity For Selected Date</h1>
							</div>
						)}
					</div>
				</section>
			)}
		</>
	);
}

export default Dashboard;
