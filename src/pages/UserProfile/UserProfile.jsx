import React, { useEffect, useState } from "react";
import CreateProfile from "./CreateProfile";
import ViewProfile from "./ViewProfile";
function UserProfile() {
	const [isProfileCreated, setIsProfileCreated] = useState(false);
	const [userProfileInfo, setUserProfileInfo] = useState({});

	useEffect(() => {
		const profileCreated = localStorage.getItem("profileExists");
		if (profileCreated) {
			setIsProfileCreated(true);
		}
	}, []);

	const setProfileCreated = (value) => {
		setIsProfileCreated(value);
		localStorage.setItem("profileExists", value);
	};

	const setProfileInfo = (info) => {
		setUserProfileInfo(info);
	};

	console.log("userProfileInfo :", userProfileInfo);

	return (
		<div className="user-profile-container">
			{!isProfileCreated ? (
				<CreateProfile
					setUserProfileInfo={setProfileInfo}
					setIsProfileCreated={setProfileCreated}
				/>
			) : (
				<ViewProfile userProfileInfo={userProfileInfo} />
			)}
		</div>
	);
}

export default UserProfile;
