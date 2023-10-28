import React, { useState } from "react";
import Card from "../../components/UI/Card";
import exercise from "../../assets/images/exercise.jpg";

function CreateProfile() {
	const [userInfo, setUserInfo] = useState({
		"img-url": "",
		name: "",
		age: "",
		gender: "",
		height: "",
		weight: "",
		"health-goal": "",
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(userInfo);
	};

	const handleInputChange = (input, value) => {
		setUserInfo((preValue) => {
			return { ...preValue, [input]: value };
		});
	};

	return (
		<div className="user-profile">
			<div className="exercise-poster">
				<img src={exercise} alt="" />
			</div>
			<Card>
				<div className="profile-form-container">
					<h2>Create Profile</h2>
					<form
						action=""
						className="user-profile-form"
						onSubmit={handleSubmit}>
						<div className="field">
							<label htmlFor="profile-image"></label>
							<input
								type="file"
								id="profile-image"
								accept="image/*"
							/>
						</div>
						<div className="field">
							<label htmlFor="name">name</label>
							<input
								type="text"
								id="name"
								value={userInfo["name"]}
								onChange={(e) =>
									handleInputChange("name", e.target.value)
								}
								placeholder="name"
							/>
						</div>
						<div className="field">
							<label htmlFor="">gender</label>
							<div className="radio-option">
								<div className="male-radio">
									<input
										type="radio"
										id="male"
										name="gender"
										value="male"
										onChange={(e) =>
											handleInputChange(
												"gender",
												e.target.value
											)
										}
									/>{" "}
									<label htmlFor="male">Male</label>
								</div>
								<div className="female-radio">
									<input
										type="radio"
										id="female"
										name="gender"
										value="female"
										onChange={(e) =>
											handleInputChange(
												"gender",
												e.target.value
											)
										}
									/>{" "}
									<label htmlFor="female">Female</label>
								</div>
							</div>
						</div>
						<div className="field">
							<div className="flex-container">
								{/* <label htmlFor="age">age</label> */}
								<input
									type="number"
									id="age"
									value={userInfo["age"]}
									onChange={(e) =>
										handleInputChange("age", e.target.value)
									}
									placeholder="age"
									min="10"
									max="100"
								/>

								{/* <label htmlFor="height">height</label> */}
								<input
									type="text"
									id="height"
									value={userInfo["height"]}
									onChange={(e) =>
										handleInputChange(
											"height",
											e.target.value
										)
									}
									placeholder="height (cm)"
								/>

								{/* <label htmlFor="weight">weight</label> */}
								<input
									type="text"
									id="weight"
									value={userInfo["weight"]}
									onChange={(e) =>
										handleInputChange(
											"weight",
											e.target.value
										)
									}
									placeholder="weight (kg)"
								/>
							</div>
						</div>
						<div className="field">
							<label htmlFor="health-goal">health goal</label>
							<select
								name=""
								id="health-goal"
								value={userInfo["health-goal"]}
								onChange={(e) =>
									handleInputChange(
										"health-goal",
										e.target.value
									)
								}>
								<option value="">Select Health Goal</option>
								<option value="weight-loss">Weight loss</option>
								<option value="weight-gain">Weight gain</option>
								<option value="muscle-building">
									Muscle building
								</option>
								<option value="maintain-body">
									Maintain body
								</option>
							</select>
						</div>
						<button type="submit">Create Profile</button>
					</form>
				</div>
			</Card>
		</div>
	);
}

export default CreateProfile;
