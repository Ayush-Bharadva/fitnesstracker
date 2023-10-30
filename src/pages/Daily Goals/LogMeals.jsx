import React, { useState } from "react";
import meal from "../../assets/images/meal.png";

const initialValue = {
	mealType: "",
	ingredients: "",
	caloriesConsumed: "",
};

function LogMeals({ addMeals }) {
	const [mealInfo, setMealInfo] = useState({
		mealType: "",
		ingredients: "",
		caloriesConsumed: "",
	});

	const handleInputChange = (input, value) => {
		setMealInfo((prevInfo) => ({ ...prevInfo, [input]: value }));
	};

	const handleMealSubmit = (e) => {
		e.preventDefault();
		addMeals(mealInfo);
		console.log("mealInfo :", mealInfo);
	};

	const hadleAddAnotherMeal = () => {
		setMealInfo(initialValue);
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
							value={mealInfo["mealType"]}
							onChange={(e) =>
								handleInputChange("mealType", e.target.value)
							}
							required>
							<option value="">select meals type</option>
							<option value="breakfast">breakfast</option>
							<option value="lunch">lunch</option>
							<option value="dinner">dinner</option>
							<option value="dinner">snack</option>
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
						<label htmlFor="calories">calories</label>
						<input
							type="number"
							id="calories"
							name="caloriesConsumed"
							value={mealInfo["caloriesConsumed"]}
							onChange={(e) =>
								handleInputChange(
									"caloriesConsumed",
									e.target.value
								)
							}
							placeholder="estimated calories"
							required
						/>
					</div>
					<button type="submit">Log meal</button>
				</form>
				<button
					className="btn"
					disabled={false}
					onClick={hadleAddAnotherMeal}>
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
