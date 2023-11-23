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
	const [yearlyCalorieDetails, setYearlyCalorieDetails] = useState(null);
	const [yearlyWeightDetails, setYearlyWeightDetails] = useState(null);
	const [allRecordsByDate, setAllRecordsByDate] = useState({});

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
				const [recordsResponse] = await Promise.all([
					getDetailsFromDateService({ date: formatedDate }),
					fetchYearlyDetails(formatedDate),
				]);

				if (recordsResponse.status === 200) {
					console.log({ ...recordsResponse.data });
					setAllRecordsByDate({ ...recordsResponse.data });
					selectedDate(formatedDate);
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
			const response = await getDetailsFromDateService({
				date: formatedDate,
			});
			if (response.status === 200) {
				// console.log(response.data);
				setAllRecordsByDate({ ...response.data });
			}
		} catch (error) {
			console.log("error fetching records :", error);
		}
	};

	const fetchYearlyDetails = async (date) => {
		const annualCalresponse = await getYearlyCaloriesDetailService(date);
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
			<section id="dashboard-section">
				<h2>
					Annual Data Tracking (Year : {selectedDate?.substring(0, 4)}
					)
				</h2>
				<section id="graph-section">
					<div className="select-date-section">
						<input
							type="date"
							name="name"
							id="date"
							value={selectedDate}
							defaultValue={selectedDate}
							onChange={handleDateChange}
						/>
					</div>
					<div className="graph-container">
						<div className="graph-wrapper">
							<Bar
								className="graph"
								options={options}
								data={yearlyWeightData}
							/>
						</div>
						<div className="graph-wrapper">
							<Bar
								className="graph"
								options={options}
								data={yearlyCalorieData}
							/>
						</div>
					</div>
				</section>
				<section id="record-section">
					{allRecordsByDate.exerciseDetails &&
					allRecordsByDate.mealDetails ? (
						<RecordCard
							allDetails={allRecordsByDate}
							isReadonly={true}
						/>
					) : (
						<div className="no-data">
							<img src={noDataFound} alt="No Data" />
							<h1>No Activity For Selected Date</h1>
						</div>
					)}
				</section>
			</section>
		</>
	);
}

export default Dashboard;
