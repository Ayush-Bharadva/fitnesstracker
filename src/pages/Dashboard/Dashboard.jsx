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
	getYearlyCaloriesDetailService,
	getYearlyWeightDetailService,
} from "../../services/services";

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

function NoDataFound({ year }) {
	return <h2>No Data Found For Year : {year}</h2>;
}

function Dashboard() {
	const [yearlyCalorieDetails, setYearlyCalorieDetails] = useState(null);
	const [yearlyWeightDetails, setYearlyWeightDetails] = useState(null);

	const date = new Date();
	const currentYear = date.getFullYear().toString();
	const [selectedYear, setSelectedYear] = useState(currentYear);

	useEffect(() => {
		const date = new Date();
		const currentYear = date.getFullYear().toString();

		const fetchYearlyDetails = async (currentYear) => {
			const annualCalresponse = await getYearlyCaloriesDetailService(
				currentYear
			);
			if (annualCalresponse.status === 200) {
				setYearlyCalorieDetails([...annualCalresponse.data]);
			}

			const annualWeightresponse = await getYearlyWeightDetailService(
				currentYear
			);
			if (annualWeightresponse.status === 200) {
				setYearlyWeightDetails([...annualWeightresponse.data]);
			}
		};
		fetchYearlyDetails(currentYear);
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
				backgroundColor: "rgba(45, 83, 51, 0.5)",
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
				backgroundColor: "rgba(53, 162, 235, 0.5)",
			},
		],
	};

	const fetchYearlyDetails = async (currentYear) => {
		const annualCalresponse = await getYearlyCaloriesDetailService(
			currentYear
		);
		if (annualCalresponse.status === 200) {
			setYearlyCalorieDetails([...annualCalresponse.data]);
		}

		const annualWeightresponse = await getYearlyWeightDetailService(
			currentYear
		);
		if (annualWeightresponse.status === 200) {
			setYearlyWeightDetails([...annualWeightresponse.data]);
		}
	};

	const handleDateChange = async (e) => {
		const selectedYear = Number(e.target.value.substring(0, 4));
		setSelectedYear(selectedYear);
		fetchYearlyDetails(selectedYear);
	};

	return (
		<section id="dashboard-section">
			<h2>Annual Data Tracking (Year : {selectedYear}) </h2>
			<div className="select-date-section">
				<input
					type="date"
					name="name"
					id="date"
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
	);
}

export default Dashboard;
