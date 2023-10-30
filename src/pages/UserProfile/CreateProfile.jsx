import React, { useState, useRef } from "react";
import Card from "../../components/UI/Card";
import exercise from "../../assets/images/exercise.jpg";
import { createUserProfile } from "../../services/fetchServices";

function CreateProfile() {
	const [userInfo, setUserInfo] = useState({
		profilePhoto: null,
		fullName: "",
		age: "",
		gender: "",
		height: "",
		weight: "",
		healthGoal: "",
	});
	const [imageUrl, setImageUrl] = useState(null);
	const inputRef = useRef(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await createUserProfile(userInfo);
		console.log(response);
		// if (response) {

		// }
		console.log(userInfo);
	};

	const handleInputChange = (input, value) => {
		setUserInfo((preValue) => {
			return { ...preValue, [input]: value };
		});
	};

	const handleDragOver = (e) => {
		e.preventDefault();
		// console.log(e, "drag over ");
	};

	const handleDrop = (e) => {
		e.preventDefault();
		// console.log(e.dataTransfer.files);

		const droppedFile = e.dataTransfer.files[0];
		if (droppedFile && droppedFile.type.startsWith("image/")) {
			const imageUrl = URL.createObjectURL(droppedFile);

			// console.log("imageUrl :", imageUrl);
			handleInputChange("profilePhoto", imageUrl);
			setImageUrl(imageUrl);
			// console.log(userInfo);
		}
	};

	const handleSelectClick = (e) => {
		e.preventDefault();
		inputRef.current.click();
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
							<div
								className="image-dropzone"
								onDragOver={handleDragOver}
								onDrop={handleDrop}>
								<button className="remove-img-btn">
									remove image
								</button>
								{!imageUrl && (
									<>
										<p>Drag n Drop your profile here</p>
										<p>or</p>
										<input
											type="file"
											style={{ display: "none" }}
											ref={inputRef}
											hidden
										/>
										<button
											className="select-image-button"
											onClick={handleSelectClick}>
											select
										</button>
									</>
								)}
								{imageUrl && (
									<>
										<div className="dropped-image-container">
											<img
												className="dropped-image"
												src={imageUrl}
												alt="dropped image"
											/>
										</div>
										<p>profile preview</p>
									</>
								)}
							</div>
						</div>
						<div className="field">
							<label htmlFor="fullName">fullName</label>
							<input
								type="text"
								id="fullName"
								value={userInfo["fullName"]}
								onChange={(e) =>
									handleInputChange(
										"fullName",
										e.target.value
									)
								}
								placeholder="fullName"
								required
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
										required
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
										required
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
									min="5"
									max="100"
									required
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
									required
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
									required
								/>
							</div>
						</div>
						<div className="field">
							<label htmlFor="healthGoal">health goal</label>
							<select
								name=""
								id="healthGoal"
								value={userInfo["healthGoal"]}
								onChange={(e) =>
									handleInputChange(
										"healthGoal",
										e.target.value
									)
								}
								required>
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
						<button type="submit" className="submit-btn">
							Create Profile
						</button>
					</form>
				</div>
			</Card>
		</div>
	);
}

export default CreateProfile;
