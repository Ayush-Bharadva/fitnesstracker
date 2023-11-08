import React, { useState } from "react";
import ExerciseOfDay from "./ExerciseOfDay";
import MealOfDay from "./MealOfDay";
import { FiChevronRight } from "react-icons/fi";
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
			data: generateRandomData(),
			borderColor: "rgb(255, 99, 132)",
			backgroundColor: "rgba(255, 99, 132, 0.5)",
			yAxisID: "y",
		},
		{
			label: "Calories",
			data: generateRandomData(),
			borderColor: "rgb(53, 162, 235)",
			backgroundColor: "rgba(253, 162, 235, 0.5)",
			yAxisID: "y1",
		},
	],
};

function Home() {
	return (
		<>
			<div className="homepage flex">
				<div className="sidebar">
					<div className="sidebar-container">
						<h2>Select Date</h2>
						<input type="date" name="" id="date" />
					</div>
				</div>
				<div className="right-sidebar flex-column">
					<div className="graph">
						<Line options={options} data={data} />
					</div>
					<div className="records flex">
						{/* <div className="exercise-records flex-column gap-1">
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
						</div> */}
					</div>
				</div>
			</div>
		</>
	);
}

export default Home;
