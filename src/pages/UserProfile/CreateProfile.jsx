import React, { useState, useEffect } from "react";
import { createUserProfileService } from "../../services/services";
import "./UserProfile.scss";
import "../../components/Common/common.scss";
import { useDropzone } from "react-dropzone";
import { isUserLoggedIn, setProfileStatus } from "../../services/helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateProfile({ setUserProfileInfo, setIsProfileCreated }) {
	// const [isProfileExists, setIsProfileExists] = useState(false);

	const [userInfo, setUserInfo] = useState({
		profilePhoto: null,
		fullName: "",
		age: "",
		gender: "",
		height: "",
		weight: "",
		healthGoal: "",
	});

	const showToastMessage = () => {
		toast.success("Profile Created Successfully..", {
			position: toast.POSITION.TOP_RIGHT,
		});
	};

	const handleInputChange = (input, value) => {
		setUserInfo((preValue) => {
			return { ...preValue, [input]: value };
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(userInfo);

		if (isUserLoggedIn()) {
			console.log("currently logged in user");
			const response = await createUserProfileService(userInfo);
			console.log(response);

			if (response.status === 409) {
				console.log("created profile exists already");
			}

			if (response.status === 200) {
				setUserProfileInfo(userInfo);
				setProfileStatus(true);
			}
		} else {
			console.log("Please Login/SignUp First");
		}
	};

	const handleRemoveImage = (e) => {
		e.preventDefault();
		setImageUrl("");
		e.stopPropagation();
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

	const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
		onDrop: handleDrop,
	});

	return (
		<>
			<div className="create-user-profile">
				<div className="profile-form-container">
					<h2 className="form-title">Create Profile</h2>
					<form
						action=""
						className="user-profile-form"
						onSubmit={handleSubmit}>
						<div className="form-left">
							<div className="field flex-column">
								<div
									{...getRootProps({
										className:
											"dropzone image-dropzone gap-1 flex-column",
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
												<img
													src={imageUrl}
													alt="profile"
												/>
											</div>
											<p className="preview-text">
												profile preview
											</p>
										</>
									) : (
										<p>
											Drag 'n' drop profile here, or click
											to select files
										</p>
									)}
								</div>
								{/* <h1>Get up! stay fit and shine!</h1> */}
							</div>
						</div>

						<div className="form-right">
							<h3 className="form-title">Your Details</h3>
							<div className="field">
								<label
									htmlFor="fullName"
									className="display-block">
									fullName
								</label>
								<input
									className="display-block"
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
											value="Male"
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
											value="Female"
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
								<label htmlFor="age" className="display-block">
									age
								</label>
								<input
									type="number"
									className="display-block"
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
							</div>
							<div className="field">
								<label
									htmlFor="height"
									className="display-block">
									height
								</label>
								<input
									type="text"
									id="height"
									className="display-block"
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
							</div>

							<div className="field">
								<label
									htmlFor="weight"
									className="display-block">
									weight
								</label>
								<input
									type="text"
									id="weight"
									className="display-block"
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

							<div className="field">
								<label
									htmlFor="healthGoal"
									className="display-block">
									health goal
								</label>
								<select
									name=""
									id="healthGoal"
									className="display-block"
									value={userInfo["healthGoal"]}
									onChange={(e) =>
										handleInputChange(
											"healthGoal",
											e.target.value
										)
									}
									required>
									<option value="">Select Health Goal</option>
									<option value="Weight_loss">
										Weight loss
									</option>
									<option value="Weight_gain">
										Weight gain
									</option>
									<option value="Muscle_building">
										Muscle building
									</option>
									<option value="Maintain_body">
										Maintain body
									</option>
								</select>
							</div>
							<button
								type="submit"
								className="create-profile-btn"
								onClick={showToastMessage}>
								Create Profile
							</button>
						</div>
					</form>
					<ToastContainer />
				</div>
			</div>
		</>
	);
}

export default CreateProfile;
