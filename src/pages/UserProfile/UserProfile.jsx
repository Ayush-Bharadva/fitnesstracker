import React, { useEffect, useState } from "react";
import CreateProfile from "./CreateProfile";
import ViewProfile from "./ViewProfile";
import { getProfileStatus } from "../../utils/helper";
import UserProfileManager from "./UserProfileManager";
import "./UserProfileManager.scss";

function UserProfile() {
	const [userProfileInfo, setUserProfileInfo] = useState({});

	const setProfileInfo = (info) => {
		setUserProfileInfo(info);
	};

	// console.log("userProfileInfo :", userProfileInfo);

	return (
		<>
			{/* <div className="user-profile-container">
				{!getProfileStatus() ? (
					<CreateProfile setUserProfileInfo={setProfileInfo} />
				) : (
					<ViewProfile userProfileInfo={userProfileInfo} />
				)}
			</div> */}
			<section id="user-profile-section">
				<div className="profile-container">
					<UserProfileManager
						setUserProfileInfo={setProfileInfo}
						isProfileCreated={!getProfileStatus() ? false : true}
					/>
				</div>
			</section>
			{/* <div className="view-profile-container"></div> */}
		</>
	);
}

export default UserProfile;

// prev : "blob:http://localhost:5173/7352436b-3954-42fd-8998-fe2f2eedc22e"
// curr : "blob:http://localhost:5173/e888e764-51b4-40ea-9915-692ba6e73ee4"
