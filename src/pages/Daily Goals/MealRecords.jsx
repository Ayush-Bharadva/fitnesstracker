import React from "react";

function MealRecords({ mealRecords, deleteMeal }) {
	console.log(mealRecords);
	return (
		<div className="records-container flex">
			<div className="meal-records flex-column">
				<h2>MealRecords</h2>
				{mealRecords.map((meal, index) => (
					<div key={index} className="record flex">
						<div className="info flex">
							<p>
								<span> Meal : </span> {meal["mealType"]}
							</p>
							<p>
								<span> Ingredients : </span>
								{meal["ingredients"]}
							</p>
							<p>
								<span> calories : </span>
								{meal["caloriesConsumed"]}
							</p>
						</div>
						<div className="actions">
							<button className="edit-btn">Edit</button>
							<button
								className="delete-btn"
								onClick={() => deleteMeal(index)}>
								Delete
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default MealRecords;
