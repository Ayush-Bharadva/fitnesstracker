export const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export const labels = [
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
	"Dec"
];

export const digitPattern = /\d/;

export const ActivityType = {
	exercise: "exercise",
	meal: "meal"
};

export const ActivityFormContent = {
	[ActivityType.exercise]: {
		formType: "exercise",
		activityHeading: "Log Exercise",
		activityText: "Exercise Type",
		optionText: "Select Exercise Type",
		calorieText: "Calories Burned",
		caloriePlaceholder: "Enter calories burned (approx)"
	},
	[ActivityType.meal]: {
		formType: "meal",
		activityHeading: "Log Meal",
		activityText: "Meal Type",
		optionText: "Select Meal Type",
		calorieText: "Calories Consumed",
		caloriePlaceholder: "Enter calories consumed (approx)"
	}
};

export const ExerciseType = {
	Weight_lifting: "weight_lifting"
};

export const TrackerType = {
	weight: "weight",
	water: "water"
};

export const TrackerConfig = {
	[TrackerType.weight]: {
		heading: "Today's Weight",
		title: "Weight (Kgs)"
	},
	[TrackerType.water]: {
		heading: "Water Drunk Today",
		title: "Water Intake (Ltrs)"
	}
};

export const ResetPassword = {
	verifyEmail: 1,
	verifyOTP: 2,
	setNewPassword: 3
};
