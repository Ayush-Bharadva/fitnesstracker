import React, { useState, useEffect } from "react";
import Card from "../../components/UI/Card";
import exercise from "../../assets/images/exercise.jpg";
import { createUserProfileService } from "../../services/services";
import "./UserProfile.scss";
import "../../common.scss";
import { useDropzone } from "react-dropzone";
import { AuthContext } from "../../contexts/AuthProvider";
import { useContext } from "react";

function CreateProfile() {
	const { isLoggedIn, isSignedUp } = useContext(AuthContext);
	console.log(isLoggedIn);

	const [userInfo, setUserInfo] = useState({
		profilePhoto: null,
		fullName: "",
		age: "",
		gender: "",
		height: "",
		weight: "",
		healthGoal: "",
	});

	const handleInputChange = (input, value) => {
		setUserInfo((preValue) => {
			return { ...preValue, [input]: value };
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(userInfo);
		console.log("isLoggedIn :", isLoggedIn);
		console.log("isSignedUp :", isSignedUp);
		// for (const key in userInfo) {
		// 	console.log(typeof userInfo[key], userInfo[key]);
		// }
		if (isLoggedIn || isSignedUp) {
			const response = await createUserProfileService(userInfo);
			console.log(response);
		} else {
			console.log("Please Login/SignUp First");
		}
	};

	const handleRemoveImage = (e) => {
		e.preventDefault();
		setImageUrl("");
	};

	const [imageUrl, setImageUrl] = useState(null);

	const handleDrop = (acceptedFiles) => {
		console.log(acceptedFiles);
		console.log("drop occured");
		console.log(URL.createObjectURL(acceptedFiles[0]));
		setImageUrl(URL.createObjectURL(acceptedFiles[0]));
	};

	useEffect(() => {
		handleInputChange("profilePhoto", imageUrl);
		console.log(userInfo);
	}, [imageUrl]);

	// console.log("imageUrl :", imageUrl);

	const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
		onDrop: handleDrop,
	});

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
								{...getRootProps({
									className:
										"dropzone image-dropzone flex-column",
								})}>
								<input {...getInputProps()} />
								{imageUrl ? (
									<>
										<button
											className="remove-img-btn"
											onClick={handleRemoveImage}>
											remove image
										</button>
										<div className="profile-img">
											<img src={imageUrl} alt="" />
										</div>
										<p className="preview-text">
											profile preview
										</p>
									</>
								) : (
									<p>
										Drag 'n' drop profile here, or click to
										select files
									</p>
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
										handleInputChange(
											"age",
											Number(e.target.value)
										)
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
											Number(e.target.value)
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
											Number(e.target.value)
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
