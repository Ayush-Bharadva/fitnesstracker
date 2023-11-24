import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import { isUserLoggedIn, setProfileStatus } from "../../utils/helper";
import {
	createUserProfileService,
	showUserProfileService,
} from "../../services/services";

function UserProfileManager({ setUserProfileInfo }) {
	const [userInfo, setUserInfo] = useState({
		profilePhoto: null,
		fullName: "",
		age: "",
		gender: "",
		height: "",
		weight: "",
		healthGoal: "",
	});

	const [inputDisabled, setInputDisabled] = useState(false);

	const [isProfileEdited, setIsProfileEdited] = useState(false);

	const showToastMessage = (type, message) => {
		toast[type](message, {
			position: toast.POSITION.TOP_RIGHT,
		});
	};

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const fetchProfileResponse = await showUserProfileService();

				if (fetchProfileResponse.status === 200) {
					setInputDisabled(true);
					const profiledata = { ...fetchProfileResponse.data };
					setUserInfo(profiledata);
				}
			} catch (error) {
				console.log("fetch user profile error :", error);
			}
		};

		fetchProfile();
	}, []);

	const handleInputChange = (input, value) => {
		setUserInfo((preValue) => {
			return { ...preValue, [input]: value };
		});
	};

	const handleSubmit = async (e, type) => {
		e.preventDefault();
		console.log(type);
		if (type === "edit") {
			setInputDisabled(false);
			return;
		}

		console.log("userInfo :", userInfo);

		if (isUserLoggedIn()) {
			console.log("currently logged in user");
			const response = await createUserProfileService(userInfo);
			console.log(response);

			if (response.status === 409) {
				showToastMessage("info", "Profile has already created!");
			}

			if (response.status === 200) {
				setUserProfileInfo(userInfo);
				setProfileStatus(true);
				setInputDisabled(true);
				showToastMessage("success", "Profile Updated..");
			}
		} else {
			console.log("Please Login/SignUp First");
		}
	};

	const handleRemoveImage = (e) => {
		e.preventDefault();
		setInputDisabled(false);
		setUserInfo((prev) => ({ ...prev, profilePhoto: "" }));
		e.stopPropagation();
	};

	const handleDrop = async (acceptedFiles, e) => {
		const preview = URL.createObjectURL(acceptedFiles[0]);
		setUserInfo((prev) => ({ ...prev, profilePhoto: preview }));
	};

	return (
		<>
			<section id="create-profile-section">
				<div className="profile-form-container">
					<h2 className="form-title">Create Profile</h2>
					<form action="" className="user-profile-form">
						<div className="form-left">
							<Dropzone onDrop={handleDrop}>
								{({ getRootProps, getInputProps }) => (
									<section>
										<div
											{...getRootProps()}
											className="image-dropzone image-container">
											<input {...getInputProps()} />
											{userInfo?.profilePhoto ? (
												<>
													<button
														className="remove-img-btn"
														onClick={
															handleRemoveImage
														}>
														remove image
													</button>
													<div className="profile-img">
														<img
															src={
																userInfo?.profilePhoto
															}
															alt="profile"
														/>
													</div>
													<p className="preview-text">
														profile preview
													</p>
												</>
											) : (
												<p>
													Drag 'n' drop profile here,
													or click to select files
												</p>
											)}
										</div>
									</section>
								)}
							</Dropzone>
						</div>

						<div className="form-right">
							<h3 className="form-title">Profile Details</h3>
							<div className="profile-form-field">
								{!userInfo ? (
									<>
										<label htmlFor="">Gender</label>
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
												<label htmlFor="male">
													Male
												</label>
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
												<label htmlFor="female">
													Female
												</label>
											</div>
										</div>
									</>
								) : (
									<>
										<label
											htmlFor="fullName"
											className="display-block">
											Gender
										</label>
										<input
											className="display-block"
											type="text"
											id="gender"
											value={userInfo["gender"]}
											placeholder="gender"
											disabled={inputDisabled}
											required
											readOnly
										/>
									</>
								)}
							</div>
							<div className="profile-form-field">
								<label htmlFor="age" className="display-block">
									Age
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
									disabled={inputDisabled}
									required
								/>
							</div>
							<div className="profile-form-field">
								<label
									htmlFor="height"
									className="display-block">
									Height
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
									disabled={inputDisabled}
									required
								/>
							</div>

							<div className="profile-form-field">
								<label
									htmlFor="weight"
									className="display-block">
									Weight
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
									disabled={inputDisabled}
									required
								/>
							</div>

							<div className="profile-form-field">
								<label
									htmlFor="healthGoal"
									className="display-block">
									Health Goal
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
									disabled={inputDisabled}
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
							{inputDisabled ? (
								<button
									className="edit-profile-btn"
									onClick={(e) => handleSubmit(e, "edit")}>
									Edit Profile
								</button>
							) : (
								<button
									// type="submit"
									className="save-profile-btn"
									onClick={(e) => handleSubmit(e, "save")}>
									Save Profile
								</button>
							)}
						</div>
					</form>
					<ToastContainer />
				</div>
			</section>
		</>
	);
}

export default UserProfileManager;
