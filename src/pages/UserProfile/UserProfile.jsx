import React from "react";
import UserProfileManager from "./UserProfileManager";
import "./UserProfile.scss";

function UserProfile() {
	return (
		<>
			<section id="user-profile-section">
				<div className="profile-container">
					<UserProfileManager />
				</div>
			</section>
		</>
	);
}

export default UserProfile;
