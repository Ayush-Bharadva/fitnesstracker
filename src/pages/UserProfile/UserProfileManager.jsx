import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import { isUserLoggedIn, setProfileStatus } from "../../utils/helper";
import {
	createUserProfileService,
	showUserProfileService,
} from "../../services/services";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Common/Loader";
import "./UserProfileManager.scss";

function UserProfileManager() {
	const navigate = useNavigate();

	const [userInfo, setUserInfo] = useState({
		profilePhoto: null,
		fullName: "",
		email: "",
		age: "",
		gender: "",
		height: "",
		weight: "",
		healthGoal: "",
	});
	const [inputDisabled, setInputDisabled] = useState(false);
	const [loading, setLoading] = useState(false);
	const [avatarLoading, setAvatarLoading] = useState(false);

	const showToastMessage = (type, message) => {
		toast[type](message, {
			position: toast.POSITION.TOP_RIGHT,
		});
	};

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				setLoading(true);
				const fetchProfileResponse = await showUserProfileService();
				setLoading(false);

				if (fetchProfileResponse.status === 200) {
					setInputDisabled(true);
					const profiledata = { ...fetchProfileResponse.data };
					setUserInfo(profiledata);
				} else {
					showToastMessage("error", "Something went wrong!!");
				}
			} catch (error) {
				console.log("fetch user profile error :", error);
				showToastMessage(
					"error",
					"An error occured while fetching user profile"
				);
			}
		};

		fetchProfile();
	}, []);

	const handleInputChange = (input, value) => {
		setUserInfo((prevUserInfo) => ({ ...prevUserInfo, [input]: value }));
	};

	const handleSubmit = async (e, type) => {
		e.preventDefault();

		if (type === "edit") {
			setInputDisabled(false);
			return;
		}

		if (!isUserLoggedIn()) {
			console.log("Please Login/SignUp First");
			navigate("/login");
			return;
		}

		try {
			console.log("currently logged in user");
			setLoading(true);
			const response = await createUserProfileService(userInfo);
			setLoading(false);
			if (response.status === 200) {
				// setUserProfileInfo(userInfo);
				setProfileStatus(true);
				setInputDisabled(true);
				showToastMessage("success", "Profile Updated..");
			}
			if (response.status === 409) {
				showToastMessage("info", "Profile has already been created!");
			}
		} catch (error) {
			console.log("Create user profile error :", error);
			showToastMessage(
				"error",
				"An error occured while updating user profile"
			);
		}
	};

	const handleRemoveImage = (e) => {
		e.preventDefault();
		setInputDisabled(false);
		setUserInfo((prevUserInfo) => ({ ...prevUserInfo, profilePhoto: "" }));
		e.stopPropagation();
	};

	const handleDrop = async (acceptedFiles) => {
		const data = new FormData();
		data.append("file", acceptedFiles[0]);

		const options = {
			method: "POST",
			url: "https://upload-image-and-return-url-by-thichthicodeteam.p.rapidapi.com/api/upload-image",
			headers: {
				Accept: "*/*",
				"X-RapidAPI-Key":
					"7b9cb3e4bdmsh673fe14fd2c1338p1ac175jsnaa23464a349f",
				"X-RapidAPI-Host":
					"upload-image-and-return-url-by-thichthicodeteam.p.rapidapi.com",
			},
			data: data,
		};

		try {
			setAvatarLoading(true);
			const response = await axios.request(options);
			setAvatarLoading(false);
			setUserInfo((prevUserInfo) => ({
				...prevUserInfo,
				profilePhoto: response.data.link,
			}));
		} catch (error) {
			console.error("image url generate error :", error);
		}
	};

	return (
		<>
			<section id="create-profile-section">
				{loading ? (
					<Loader color="#37455f" height="64px" width="64px" />
				) : (
					<div className="profile-form-container">
						<h2 className="form-title">Create Profile</h2>
						<form action="" className="user-profile-form">
							<div className="form-left">
								{userInfo.profilePhoto ? (
									<div className="image-container">
										{avatarLoading ? (
											<Loader
												color="#37455f"
												height="32px"
												width="32px"
											/>
										) : (
											<>
												<button
													className="remove-img-btn"
													onClick={handleRemoveImage}>
													X
												</button>
												<div className="profile-img">
													<img
														src={
															userInfo.profilePhoto
														}
														alt="profile"
													/>
												</div>
											</>
										)}

										<div className="text-center">
											<p className="fullname-preview preview">
												{userInfo.fullName}
											</p>
											<p className="email-preview preview">
												{userInfo.email}
											</p>
										</div>
									</div>
								) : (
									<Dropzone onDrop={handleDrop}>
										{({ getRootProps, getInputProps }) => (
											<section>
												<div
													{...getRootProps()}
													className="image-dropzone image-container">
													<input
														{...getInputProps()}
													/>
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
																		userInfo.profilePhoto
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
															Drag 'n' drop
															profile here, or
															click to select
															files
														</p>
													)}
												</div>
											</section>
										)}
									</Dropzone>
								)}
							</div>

							<div className="form-right">
								<h3 className="form-title">Profile Details</h3>
								<div className="profile-form-field">
									<label
										htmlFor="fullName"
										className="display-block">
										Fullname
									</label>
									<input
										type="text"
										className="display-block"
										id="fullName"
										value={userInfo["fullName"]}
										onChange={(e) =>
											handleInputChange(
												"fullName",
												e.target.value
											)
										}
										placeholder="Fullname"
										disabled={inputDisabled}
										required
									/>
								</div>
								<div className="profile-form-field">
									<label
										htmlFor="email"
										className="display-block">
										Email
									</label>
									<input
										type="text"
										className="display-block"
										id="email"
										value={userInfo["email"]}
										onChange={(e) =>
											handleInputChange(
												"email",
												e.target.value
											)
										}
										placeholder="Email"
										disabled={inputDisabled}
										required
									/>
								</div>
								<div className="profile-form-field">
									<label htmlFor="gender">Gender</label>
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
												checked={
													userInfo.gender === "Male"
												}
												disabled={inputDisabled}
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
												checked={
													userInfo.gender === "Female"
												}
												disabled={inputDisabled}
												required
											/>{" "}
											<label htmlFor="female">
												Female
											</label>
										</div>
									</div>
								</div>
								<div className="profile-form-field">
									<label
										htmlFor="age"
										className="display-block">
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
										<option value="">
											Select Health Goal
										</option>
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
										onClick={(e) =>
											handleSubmit(e, "edit")
										}>
										Edit Profile
									</button>
								) : (
									<button
										className="save-profile-btn"
										onClick={(e) =>
											handleSubmit(e, "save")
										}>
										Save Profile
									</button>
								)}
							</div>
						</form>
						<ToastContainer />
					</div>
				)}
			</section>
		</>
	);
}

export default UserProfileManager;
