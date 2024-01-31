import { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { ToastContainer } from "react-toastify";
import { showToast } from "../../utils/helper";
import {
	createUserProfileService,
	getImageUrlService,
	fetchUserProfile,
} from "../../services/services";
import Loader from "../../components/Common/Loader";
import "./UserProfile.scss";
import ReactLoading from "react-loading";
import { emailPattern } from "../../constants/constants";

const initialErrorValue = {
	fullNameError: "",
	emailError: "",
	ageError: "",
	heightError: "",
	weightError: "",
};

const initialUserDetails = {
	profilePhoto: null,
	fullName: "",
	email: "",
	age: "",
	gender: "",
	height: "",
	weight: "",
	healthGoal: "",
};

function UserProfile() {
	const [userDetails, setUserDetails] = useState(initialUserDetails);
	const [inputError, setInputError] = useState(initialErrorValue);
	const [inputDisabled, setInputDisabled] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [isImageLoading, setIsImageLoading] = useState(false);

	useEffect(() => {
		const fetchProfileDetails = async () => {
			try {
				const userProfileDetails = await fetchUserProfile();
				setIsLoading(false);

				if (userProfileDetails.status === 200) {
					setInputDisabled(true);
					setUserDetails({ ...userProfileDetails.data });
				}
			} catch (error) {
				setIsLoading(false);
				showToast(
					"error",
					"An error occured while fetching user profile"
				);
			}
		};
		fetchProfileDetails();
	}, []);

	const validateInput = (name, value) => {
		switch (name) {
			case "fullName":
				return !value.trim() || value.length < 4
					? "Please enter correct fullname(must contains atleast 4 characters)"
					: "";
			case "email":
				return !value.trim() || !emailPattern.test(value)
					? "invalid Email"
					: "";
			case "age":
				return !value || value < 1 || value >= 130
					? "Please enter valid age (between 1 to 130)"
					: "";
			case "height":
				return !value || value < 50 || value >= 300
					? "Height should be more than 50 cms or less than 300 cms"
					: "";
			case "weight":
				return !value || value < 2 || value >= 700
					? "Weight should be more than 2 kgs and less than 700 kgs"
					: "";
			default:
				break;
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		const validationErrors = { ...inputError };
		const error = validateInput(name, value);

		if (!value) {
			validationErrors[
				`${name}Error`
			] = `${name.toLowerCase()} is required`;
		} else {
			validationErrors[`${name}Error`] = error;
		}

		setInputError((prevErrors) => ({ ...prevErrors, ...validationErrors }));
		setUserDetails((prevUserInfo) => {
			return {
				...prevUserInfo,
				[name]:
					["age", "height", "weight"].includes(name) && name !== ""
						? +value
						: value,
			};
		});
	};

	const handleSubmit = async (e, type) => {
		e.preventDefault();

		if (type === "edit") {
			setInputDisabled(false);
			return;
		}

		const errorDetails = Object.values(inputError);
		const hasInputError = errorDetails.some((error) => error.length);

		if (hasInputError) {
			showToast("error", "Please fill all details properly");
			return;
		}

		const response = await createUserProfileService(userDetails);
		if (response.status === 200) {
			setIsLoading(false);
			setInputDisabled(true);
			setInputError(initialErrorValue);
			showToast("success", "Profile Updated..");
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
		setIsImageLoading(true);
		const imageUrl = await getImageUrlService(acceptedFiles);
		setUserDetails((prevUserInfo) => ({
			...prevUserInfo,
			profilePhoto: imageUrl,
		}));
		setIsImageLoading(false);
	};

	const removeImageBtnStyles = {
		display: inputDisabled ? "none" : "block",
	};

	return (
		<section id="user-profile-section">
			{isLoading ? (
				<Loader color="#37455f" height="64px" width="64px" />
			) : (
				<div className="profile-form-container">
					<h2 className="form-title">Profile</h2>
					<form className="user-profile-form">
						<div className="form-left">
							{!userDetails.profilePhoto ? (
								isImageLoading ? (
									<div>
										<ReactLoading
											className="image-loader"
											type="spin"
											color="#37455f"
											height="32px"
											width="32px"
										/>
									</div>
								) : (
									<Dropzone onDrop={handleImageDrop}>
										{({ getRootProps, getInputProps }) => (
											<div
												{...getRootProps()}
												className="image-dropzone"
											>
												<input {...getInputProps()} />
												<p className="drop-text">
													Drag &apos;n&apos; drop
													profile here, or click to
													select files
												</p>
											</div>
										)}
									</Dropzone>
								)
							) : (
								<div className="image-container">
									<button
										className="remove-img-btn"
										style={removeImageBtnStyles}
										onClick={handleRemoveImage}
									>
										X
									</button>
									<div className="profile-img">
										{userDetails.profilePhoto && (
											<img
												src={userDetails?.profilePhoto}
												alt="profile"
											/>
										)}
									</div>
									<p className="text-center text-your-image">
										Your Image
									</p>
								</div>
							)}
						</div>

						<div className="form-right">
							<div className="title-wrapper">
								<h3 className="form-title">Profile Details</h3>
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

							<div className="form-elements-container">
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
										name="fullName"
										title={userDetails["fullName"]}
										value={userDetails["fullName"]}
										onChange={handleInputChange}
										placeholder="Fullname"
										disabled={inputDisabled}
										required
									/>
									<p className="profile-input-error">
										{inputError.fullNameError}
									</p>
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
										name="email"
										title={userDetails["email"]}
										value={userDetails["email"]}
										onChange={handleInputChange}
										placeholder="Email"
										disabled={inputDisabled}
										required
									/>
									<p className="profile-input-error">
										{inputError.emailError}
									</p>
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
												onChange={handleInputChange}
												checked={
													userDetails.gender ===
													"Male"
												}
												disabled={inputDisabled}
												required
											/>
											<label
												htmlFor="male"
												style={{ margin: "4px" }}
											>
												Male
											</label>
										</div>
										<div>
											<input
												type="radio"
												id="female"
												name="gender"
												value="Female"
												onChange={handleInputChange}
												checked={
													userDetails.gender ===
													"Female"
												}
												disabled={inputDisabled}
												required
											/>
											<label
												htmlFor="female"
												style={{ margin: "4px" }}
											>
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
										Age (Years)
									</label>
									<input
										type="text"
										className="display-block"
										id="age"
										name="age"
										title={userDetails["age"]}
										value={userDetails["age"]}
										onChange={handleInputChange}
										placeholder="age"
										disabled={inputDisabled}
										required
									/>
									<p className="profile-input-error">
										{inputError.ageError}
									</p>
								</div>
								<div className="form-group">
									<label
										htmlFor="height"
										className="display-block"
									>
										Height (cms)
									</label>
									<input
										type="text"
										id="height"
										name="height"
										className="display-block"
										title={userDetails["height"]}
										value={userDetails["height"]}
										onChange={handleInputChange}
										placeholder="height (cm)"
										disabled={inputDisabled}
										required
									/>
									<p className="profile-input-error">
										{inputError.heightError}
									</p>
								</div>
								<div className="form-group">
									<label
										htmlFor="weight"
										className="display-block"
									>
										Weight (kgs)
									</label>
									<input
										type="text"
										id="weight"
										className="display-block"
										name="weight"
										title={userDetails["weight"]}
										value={userDetails["weight"]}
										onChange={handleInputChange}
										placeholder="weight (kg)"
										disabled={inputDisabled}
										required
									/>
									<p className="profile-input-error">
										{inputError.weightError}
									</p>
								</div>
								<div className="form-group">
									<label
										htmlFor="healthGoal"
										className="display-block"
									>
										Health Goal
									</label>
									<select
										name="healthGoal"
										id="healthGoal"
										className="display-block"
										value={userDetails["healthGoal"]}
										onChange={handleInputChange}
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
							</div>
						</div>
					</form>
					<ToastContainer />
				</div>
			)}
		</section>
	);
}

export default UserProfile;
