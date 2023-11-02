import React, { useState, useEffect } from "react";
import Card from "../../components/UI/Card";
import "./UserProfile.scss";
import "../../global.scss";

function ViewProfile({ userProfileInfo }) {
	// const [userProfileInfo, setUserProfileInfo] = useState({});
	console.log("userProfileInfo :", userProfileInfo);

	return (
		<div className="full-width full-height view-profile padding-1 home-container">
			<h2 className="text-center margin-1">Your Profile</h2>
			<div className="profile-info flex padding-1 full-height">
				<div className="flex-column gap-1 flex-50">
					<div className="flex bg-grey gap-1 rounded-border padding-1">
						<div>
							<div className="profile-img-container">
								<img
									src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRcbAfbjsK1ZBphebpOkRbkbOMshLEeNnNxQ&usqp=CAU"
									alt="profile image"
								/>
							</div>
							<h3 className="text-center margin-1 text-white">
								Your profile
							</h3>
						</div>
						<p className="">Full Name :</p>
					</div>
					<div className="flex bg-grey rounded-border padding-1 gap-1">
						<p className="">Gender : </p>
						<p className="">height : </p>
						<p className="">age : </p>
						<p className="">weight : </p>
					</div>
				</div>
				<div className="bg-grey flex-50 flex-column padding-1 rounded-border">
					<div className="flex-column">
						<p>Lorem ipsum dolor sit amet</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ViewProfile;
