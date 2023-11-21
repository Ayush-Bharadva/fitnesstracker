import React, { useEffect, useState } from "react";
import "./Dashboard.scss";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { getYearlyCaloriesDetailService } from "../../services/services";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const options = {
	responsive: true,
	interaction: {
		mode: "index",
		intersect: false,
	},
	stacked: false,
	plugins: {
		title: {
			display: true,
			text: "Chart.js Line Chart - Multi Axis",
		},
	},
	scales: {
		y: {
			type: "linear",
			display: true,
			position: "left",
		},
		y1: {
			type: "linear",
			display: true,
			position: "right",
			grid: {
				drawOnChartArea: false,
			},
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

const generateRandomData = () => {
	return labels.map(() => Math.floor(Math.random() * 2000 - 1000));
};

function Dashboard() {
	// useEffect(() => {
	// }, []);

	const [yearlyCalorieDetails, setYearlyCalorieDetails] = useState(null);

	const data = {
		labels,
		datasets: [
			{
				label: "Weight",
				data: [
					150, 175, 120, 95, 200, 219, 179, 196, 111, 300, 223, 153,
				],
				borderColor: "rgb(255, 99, 132)",
				backgroundColor: "rgba(255, 99, 132, 0.5)",
				yAxisID: "y",
			},
			{
				label: "Calories",
				data: yearlyCalorieDetails?.map(
					(data) => data.averageMonthlyCaloriesBurned,
					[]
				),
				borderColor: "rgb(53, 162, 235)",
				backgroundColor: "rgba(253, 162, 235, 0.5)",
				yAxisID: "y1",
			},
		],
	};

	const fetchCalorieDetails = async (year) => {
		const response = await getYearlyCaloriesDetailService(year);

		if (response.status === 200) {
			setYearlyCalorieDetails([...response.data]);
		}
	};

	const handleDateChange = async (e) => {
		const selectedYear = Number(e.target.value.substring(0, 4));

		fetchCalorieDetails(selectedYear);
	};

	return (
		<section id="dashboard-section">
			<div className="graph-container">
				<Line className="graph" options={options} data={data} />
				{/* <Line className="graph" options={options} data={data} /> */}
			</div>
			<div className="select-date-section">
				<h2>Select Date</h2>
				<input
					type="date"
					name="name"
					id="date"
					onChange={handleDateChange}
				/>
			</div>
		</section>
	);
}

export default Dashboard;
