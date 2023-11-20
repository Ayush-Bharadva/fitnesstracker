import React, { useState } from "react";
import "../../App.scss";
import "../../global.scss";
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

const data = {
	labels,
	datasets: [
		{
			label: "Weight",
			data: [150, 175, 120, 95, 200, 219, 179, 196, 111, 300, 223, 153],
			borderColor: "rgb(255, 99, 132)",
			backgroundColor: "rgba(255, 99, 132, 0.5)",
			yAxisID: "y",
		},
		{
			label: "Calories",
			data: [
				1000, 1500, 1020, 905, 600, 1900, 1079, 1096, 1011, 1600, 1006,
				850,
			],
			borderColor: "rgb(53, 162, 235)",
			backgroundColor: "rgba(253, 162, 235, 0.5)",
			yAxisID: "y1",
		},
	],
};

const handleDateChange = (e) => {
	console.log(e.target.value);
};

function Home() {
	return (
		<>
			<div className="home-section">
				<div className="graph-container">
					<Line className="graph" options={options} data={data} />
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

				{/* <div className="">
					<div className="records flex">
						<div className="exercise-records flex-column gap-1">
							<p className="title text-left">
								Exercise performed
							</p>
							<ExerciseOfDay />
							<ExerciseOfDay />
						</div>
						<div className="meal-records flex-column gap-1">
							<p className="title text-left">Meals Taken</p>
							<MealOfDay />
							<MealOfDay />
						</div>
					</div>
				</div> */}
			</div>
		</>
	);
}

export default Home;
