import React, { useState } from "react";
import CreateProfile from "./CreateProfile";
import ViewProfile from "./ViewProfile";
function UserProfile() {
	const [isProfileCreated, setIsProfileCreated] = useState(false);
	const [userProfileInfo, setUserProfileInfo] = useState({});

	return (
		<div className="home-container">
			{!isProfileCreated ? (
				<CreateProfile
					setUserProfileInfo={setUserProfileInfo}
					setIsProfileCreated={setIsProfileCreated}
				/>
			) : (
				<ViewProfile userProfileInfo={userProfileInfo} />
			)}
		</div>
	);
}

export default UserProfile;
