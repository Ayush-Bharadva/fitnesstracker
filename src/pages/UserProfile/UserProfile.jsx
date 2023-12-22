import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { ToastContainer } from "react-toastify";
import { showToast } from "../../utils/helper";
import {
	createUserProfileService,
	getImageUrlService,
	showUserProfileService,
} from "../../services/services";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Common/Loader";
import "./UserProfile.scss";

function UserProfile() {
	const [userDetails, setUserDetails] = useState({
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
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const fetchProfileResponse = await showUserProfileService();
				setLoading(false);

				if (fetchProfileResponse.status === 200) {
					setInputDisabled(true);
					setUserDetails({ ...fetchProfileResponse.data });
				}
			} catch (error) {
				setLoading(false);
				showToast(
					"error",
					"An error occured while fetching user profile"
				);
			}
		};

		fetchProfile();
	}, []);

	const handleInputChange = (input, value) => {
		setUserDetails((prevUserInfo) => ({ ...prevUserInfo, [input]: value }));
	};

	const handleSubmit = async (e, type) => {
		e.preventDefault();

		if (type === "edit") {
			setInputDisabled(false);
			return;
		}

		try {
			const response = await createUserProfileService(userDetails);
			setLoading(false);
			if (response.status === 200) {
				setInputDisabled(true);
				showToast("success", "Profile Updated..");
			}
		} catch (error) {
			showToast("error", "An error occured while updating user profile");
		}
	};

	const handleRemoveImage = (e) => {
		e.preventDefault();
		setInputDisabled(false);
		setUserDetails((prevUserInfo) => ({
			...prevUserInfo,
			profilePhoto: "",
		}));
		e.stopPropagation();
	};

	const handleImageDrop = async (acceptedFiles) => {
		const imageUrl = await getImageUrlService(acceptedFiles);
		setUserDetails((prevUserInfo) => ({
			...prevUserInfo,
			profilePhoto: imageUrl,
		}));
	};

	return (
		<>
			<section id="user-profile-section">
				{loading ? (
					<Loader color="#37455f" height="64px" width="64px" />
				) : (
					<div className="profile-form-container">
						<h2 className="form-title">Profile</h2>
						<form action="" className="user-profile-form">
							<div className="form-left">
								{userDetails.profilePhoto ? (
									<div className="image-container">
										<button
											className="remove-img-btn"
											onClick={handleRemoveImage}
										>
											X
										</button>
										<div className="profile-img">
											<img
												src={userDetails?.profilePhoto}
												alt="profile"
											/>
										</div>
										<div className="text-center">
											<p className="fullname-preview preview">
												{userDetails.fullName}
											</p>
											<p className="email-preview preview">
												{userDetails.email}
											</p>
										</div>
									</div>
								) : (
									<Dropzone onDrop={handleImageDrop}>
										{({ getRootProps, getInputProps }) => (
											<section>
												<div
													{...getRootProps()}
													className="image-dropzone"
												>
													<input
														{...getInputProps()}
													/>
													<p>
														Drag 'n' drop profile
														here, or click to select
														files
													</p>
												</div>
											</section>
										)}
									</Dropzone>
								)}
							</div>

							<div className="form-right">
								<h3 className="form-title">Profile Details</h3>
								<div className="form-group">
									<label
										htmlFor="fullName"
										className="display-block"
									>
										Fullname
									</label>
									<input
										type="text"
										className="display-block"
										id="fullName"
										value={userDetails["fullName"]}
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
								<div className="form-group">
									<label
										htmlFor="email"
										className="display-block"
									>
										Email
									</label>
									<input
										type="text"
										className="display-block"
										id="email"
										value={userDetails["email"]}
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
								<div className="form-group">
									<label htmlFor="gender">Gender</label>
									<div className="radio-option">
										<div>
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
													userDetails.gender ===
													"Male"
												}
												disabled={inputDisabled}
												required
											/>{" "}
											<label htmlFor="male">Male</label>
										</div>
										<div>
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
													userDetails.gender ===
													"Female"
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
								<div className="form-group">
									<label
										htmlFor="age"
										className="display-block"
									>
										Age
									</label>
									<input
										type="number"
										className="display-block"
										id="age"
										value={userDetails["age"]}
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
								<div className="form-group">
									<label
										htmlFor="height"
										className="display-block"
									>
										Height
									</label>
									<input
										type="text"
										id="height"
										className="display-block"
										value={userDetails["height"]}
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
								<div className="form-group">
									<label
										htmlFor="weight"
										className="display-block"
									>
										Weight
									</label>
									<input
										type="text"
										id="weight"
										className="display-block"
										value={userDetails["weight"]}
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
								<div className="form-group">
									<label
										htmlFor="healthGoal"
										className="display-block"
									>
										Health Goal
									</label>
									<select
										name=""
										id="healthGoal"
										className="display-block"
										value={userDetails["healthGoal"]}
										onChange={(e) =>
											handleInputChange(
												"healthGoal",
												e.target.value
											)
										}
										disabled={inputDisabled}
										required
									>
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
								<button
									className={
										inputDisabled
											? "edit-profile-btn"
											: "save-profile-btn"
									}
									onClick={(e) =>
										handleSubmit(
											e,
											inputDisabled ? "edit" : "save"
										)
									}
								>
									{inputDisabled
										? "Edit Profile"
										: "Save Profile"}
								</button>
							</div>
						</form>
						<ToastContainer />
					</div>
				)}
			</section>
		</>
	);
}

export default UserProfile;
