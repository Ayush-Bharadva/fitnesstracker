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
	const [loading, setLoading] = useState(false);

	const date = new Date();
	const currentYear = date.getFullYear().toString();
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const currentDate = date.getDate().toString().padStart(2, "0");
	const formatedDate = `${currentYear}-${month}-${currentDate}`;

	const [selectedDate, setSelectedDate] = useState(formatedDate);

	useEffect(() => {
		const date = new Date();
		const currentYear = date.getFullYear().toString();
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const currentDate = date.getDate().toString().padStart(2, "0");
		const formatedDate = `${currentYear}-${month}-${currentDate}`;

		const fetchData = async () => {
			try {
				setLoading(true);
				const [recordsResponse] = await Promise.all([
					getDetailsFromDateService({ date: formatedDate }),
					fetchYearlyDetails(formatedDate),
				]);
				setLoading(false);

				console.log(recordsResponse);

				if (recordsResponse.status === 200) {
					// console.log({ ...recordsResponse.data });
					setAllRecordsByDate({ ...recordsResponse.data });
					setSelectedDate(formatedDate);
				} else if (recordsResponse.status === 498) {
					navigate("/auth");
				} else {
					console.log("Something went wrong!");
				}
			} catch (error) {
				console.log("fetch data error :", error);
			}
		};

		fetchData();
	}, []);

	const yearlyWeightData = {
		labels,
		datasets: [
			{
				label: "Weight",
				data: yearlyWeightDetails?.map(
					(data) => data.averageMonthlyWeight,
					[]
				),
				backgroundColor: "rgba(45, 83, 51, 0.75)",
			},
		],
	};
	const yearlyCalorieData = {
		labels,
		datasets: [
			{
				label: "Calories",
				data: yearlyCalorieDetails?.map(
					(data) => data.averageMonthlyCaloriesBurned,
					[]
				),
				backgroundColor: "rgba(53, 162, 235, 0.75)",
			},
		],
	};

	const fetchAllRecords = async (formatedDate) => {
		try {
			setLoading(true);
			const response = await getDetailsFromDateService({
				date: formatedDate,
			});
			setLoading(false);
			if (response.status === 200) {
				// console.log(response.data);
				setAllRecordsByDate({ ...response.data });
			}
		} catch (error) {
			console.log("error fetching records :", error);
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
		console.log(
			"yearChanged :",
			selectedDate?.substring(0, 4) !== target.value.substring(0, 4)
		);

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
						{allRecordsByDate.exerciseDetails &&
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
