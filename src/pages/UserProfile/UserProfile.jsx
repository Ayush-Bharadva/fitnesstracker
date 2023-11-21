import React, { useEffect, useState } from "react";
import CreateProfile from "./CreateProfile";
import ViewProfile from "./ViewProfile";
import { getProfileStatus } from "../../services/helper";
import UserProfileManager from "./UserProfileManager";
import "./UserProfileManager.scss";

function UserProfile() {
	const [userProfileInfo, setUserProfileInfo] = useState({});

	const setProfileInfo = (info) => {
		setUserProfileInfo(info);
	};

	console.log("userProfileInfo :", userProfileInfo);

	return (
		<>
			<div className="user-profile-container">
				{!getProfileStatus() ? (
					<CreateProfile setUserProfileInfo={setProfileInfo} />
				) : (
					<ViewProfile userProfileInfo={userProfileInfo} />
				)}
			</div>
			<section id="user-profile-manager">
				{/* <UserProfileManager /> */}
			</section>
		</>
	);
}

export default UserProfile;
