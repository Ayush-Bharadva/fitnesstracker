import React, { useState } from "react";
import { addMealService } from "../../services/services";
import { getProfileStatus, isUserLoggedIn } from "../../services/helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialValue = {
	mealType: "",
	ingredients: "",
	caloriesConsumed: "",
};

function LogMeals({ addMeals }) {
	const showAddToast = () => {
		toast.success("Meal added..", {
			position: toast.POSITION.TOP_RIGHT,
		});
	};
	const showDuplicateToast = () => {
		toast.error("Meal_Type already added..", {
			position: toast.POSITION.TOP_RIGHT,
		});
	};

	const [mealInfo, setMealInfo] = useState({
		mealType: "",
		ingredients: "",
		caloriesConsumed: "",
	});

	const handleInputChange = (input, value) => {
		setMealInfo((prevInfo) => ({ ...prevInfo, [input]: value }));
	};

	const handleMealSubmit = async (e) => {
		e.preventDefault();
		addMeals(mealInfo);
		console.log("mealInfo :", mealInfo);

		if (isUserLoggedIn() && getProfileStatus()) {
			const response = await addMealService(mealInfo);
			console.log(response);
			if (response.status === 200) {
				showAddToast();
				setMealInfo(initialValue);
				console.log("meal added successfully..");
			} else if (response.status == 409) {
				showDuplicateToast();
				console.log("meal added already");
			}
		} else {
			console.log("make sure you have logged in and Created Profile");
		}
	};

	return (
		// <div className="log-meals-section">
		<div className="log-meals-form">
			<form action="" onSubmit={handleMealSubmit}>
				<h2>Log Meals</h2>
				<div className="field">
					<label htmlFor="meal">Meal Type</label>
					<select
						name="meals"
						id="meal"
						value={mealInfo["mealType"]}
						onChange={(e) =>
							handleInputChange("mealType", e.target.value)
						}
						required>
						<option value="">Select meals type</option>
						<option value="Breakfast">Breakfast</option>
						<option value="Lunch">Lunch</option>
						<option value="Dinner">Dinner</option>
						<option value="Snacks">Snacks</option>
					</select>
				</div>
				<div className="field">
					<label htmlFor="ingredients">Ingredients</label>
					<input
						type="text"
						id="ingredients"
						name="ingredients"
						value={mealInfo["ingredients"]}
						onChange={(e) =>
							handleInputChange("ingredients", e.target.value)
						}
						placeholder="meal ingredients"
						required
					/>
				</div>
				<div className="field">
					<label htmlFor="calories">Calories</label>
					<input
						type="number"
						id="calories"
						name="caloriesConsumed"
						value={mealInfo["caloriesConsumed"]}
						onChange={(e) =>
							handleInputChange(
								"caloriesConsumed",
								Number(e.target.value)
							)
						}
						placeholder="estimated calories"
						required
					/>
				</div>

				<div className="field">
					<button
						type="submit"
						className="btn"
						onClick={handleMealSubmit}>
						Add meal
					</button>
				</div>
			</form>
			<ToastContainer />
		</div>
		// </div>
	);
}

export default LogMeals;
