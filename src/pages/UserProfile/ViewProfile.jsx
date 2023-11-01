import React, { useState, useEffect } from "react";
import Card from "../../components/UI/Card";
import "./UserProfile.scss";
import "../../global.scss";

function ViewProfile({ userProfileInfo }) {
	// const [userProfileInfo, setUserProfileInfo] = useState({});
	console.log("userProfileInfo :", userProfileInfo);

	return (
		<div className="full-width full-height view-profile padding-1">
			<h2 className="text-center margin-1">Your Profile</h2>
			<div className="flex profile-info">
				<div className="profile-img-container">
					<img
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRcbAfbjsK1ZBphebpOkRbkbOMshLEeNnNxQ&usqp=CAU"
						alt="profile image"
					/>
				</div>
				{/* <div className="separator"></div> */}
				<div className="profile-info-container">
					<p>Full Name :</p>
					<p>Gender : </p>
					<p>age : </p>
					<p>height : </p>
					<p>weight : </p>
				</div>
			</div>
		</div>
	);
}

export default ViewProfile;
