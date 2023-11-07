import React, { useEffect, useState } from "react";
import CreateProfile from "./CreateProfile";
import ViewProfile from "./ViewProfile";
import { getProfileStatus } from "../../services/helper";

function UserProfile() {
	const [userProfileInfo, setUserProfileInfo] = useState({});

	const setProfileInfo = (info) => {
		setUserProfileInfo(info);
	};

	console.log("userProfileInfo :", userProfileInfo);

	return (
		<div className="user-profile-container">
			{!getProfileStatus() ? (
				<CreateProfile setUserProfileInfo={setProfileInfo} />
			) : (
				<ViewProfile userProfileInfo={userProfileInfo} />
			)}
		</div>
	);
}

export default UserProfile;
