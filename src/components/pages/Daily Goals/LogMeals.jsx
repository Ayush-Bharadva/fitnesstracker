import React, { useState } from "react";
import meal from "../../../assets/images/meal.png";

function LogMeals() {
	const [mealInfo, setMealInfo] = useState({
		"meal-type": "",
		"meal-calories": "",
	});

	const handleInputChange = (input, value) => {
		setMealInfo((prevInfo) => ({ ...prevInfo, [input]: value }));
	};

	const handleMealSubmit = (e) => {
		e.preventDefault();
		console.log("mealInfo :", mealInfo);
	};

	return (
		<div className="log-meals-section">
			<div className="log-meals-form">
				<form action="" onSubmit={handleMealSubmit}>
					<div className="field">
						<label htmlFor="meal">meal type</label>
						<select
							name="meals"
							id="meal"
							value={mealInfo["meal-type"]}
							onChange={(e) =>
								handleInputChange("meal-type", e.target.value)
							}>
							<option value="">select meals type</option>
							<option value="breakfast">breakfast</option>
							<option value="lunch">lunch</option>
							<option value="dinner">dinner</option>
						</select>
					</div>
					<div className="field">
						<label htmlFor="calories">calories</label>
						<input
							type="number"
							id="calories"
							name="meal-calories"
							value={mealInfo["meal-calories"]}
							onChange={(e) =>
								handleInputChange(
									"meal-calories",
									e.target.value
								)
							}
							placeholder="estimated calories"
						/>
					</div>
					<button type="submit">Log meal</button>
				</form>
				<button
					className="btn"
					disabled={false}
					onClick={() => console.log("add another meal clicked")}>
					Add another meal
				</button>
			</div>
			<div className="meals-image">
				<img src={meal} alt="" />
			</div>
		</div>
	);
}

export default LogMeals;
