import React, { useState, useEffect } from "react";
import "./UserProfile.scss";
import "../../global.scss";

function ViewProfile({ userProfileInfo }) {
	const [inputDisabled, setInputDisabled] = useState(true);
	const [editedUserInfo, setEditedUserInfo] = useState({
		...userProfileInfo,
	});
	const [isProfileEditable, setIsProfileEditable] = useState(false);

	const handleEditProfile = () => {
		setIsProfileEditable(true);
	};

	// api call for edit profile
	const handleSaveProfile = () => {
		setIsProfileEditable(false);
	};

	const handleInputChange = (input, value) => {
		setEditedUserInfo((prev) => ({ ...prev, [input]: value }));
	};

	useEffect(() => {
		isProfileEditable ? setInputDisabled(false) : setInputDisabled(true);
	}, [isProfileEditable]);

	return (
		<>
			<div className="view-profile-container">
				<div className="img-info">
					<h2 className="margin-y-1">My Profile</h2>
					<div className="profile-img-container">
						<img
							src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRcbAfbjsK1ZBphebpOkRbkbOMshLEeNnNxQ&usqp=CAU"
							alt="profile image"
						/>
					</div>
					<p className="text-bold">profile</p>
				</div>
				<div className="profile-info">
					<div className="content">
						<div className="flex flex-between margin-y-1">
							<h2>Profile Details</h2>
							<button
								className="edit-content-btn"
								onClick={handleEditProfile}>
								Edit Profile
							</button>
						</div>
						<form action="">
							<span>Full Name</span>
							<input
								type="text"
								className="content-text"
								value={userProfileInfo["fullName"]}
								onChange={(e) =>
									handleInputChange(
										"fullName",
										e.target.value
									)
								}
								disabled={inputDisabled}
							/>
							<span>Gender</span>
							<input
								type="text"
								className="content-text"
								value={userProfileInfo["gender"]}
								onChange={(e) =>
									handleInputChange("gender", e.target.value)
								}
								disabled={inputDisabled}
							/>
							<span>Age</span>
							<input
								type="text"
								inputMode="numeric"
								className="content-text"
								value={userProfileInfo["age"]}
								onChange={(e) =>
									handleInputChange("age", e.target.value)
								}
								disabled={inputDisabled}
							/>
							<span>height</span>
							<input
								type="text"
								className="content-text"
								value={userProfileInfo["height"]}
								onChange={(e) =>
									handleInputChange("height", e.target.value)
								}
								disabled={inputDisabled}
							/>
							<span>weight</span>
							<input
								type="text"
								className="content-text"
								value={userProfileInfo["weight"]}
								onChange={(e) =>
									handleInputChange("weight", e.target.value)
								}
								disabled={inputDisabled}
							/>
							<span>Fitness Goal</span>
							<input
								type="text"
								className="content-text"
								value={userProfileInfo["healthGoal"]}
								onChange={(e) =>
									handleInputChange(
										"healthGoal",
										e.target.value
									)
								}
								disabled={inputDisabled}
							/>
							<button
								className="update-profile-button"
								type="submit"
								onClick={handleSaveProfile}
								disabled={inputDisabled}>
								Save Profile
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default ViewProfile;
