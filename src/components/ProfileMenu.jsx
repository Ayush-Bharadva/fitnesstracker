import React, { useState } from "react";
import user from "../assets/icons/user.png";
import userIcon from "../assets/icons/userIcon.png";
import settingsIcon from "../assets/icons/settingsIcon.png";
import logoutIcon from "../assets/icons/logoutIcon.png";
import historyIcon from "../assets/icons/historyIcon.png";

function ProfileMenu() {
	const profileOptions = [
		{
			text: "view profile",
			img: userIcon,
		},
		{
			text: "history",
			img: historyIcon,
		},
		{
			text: "settings",
			img: settingsIcon,
		},
		{
			text: "logout",
			img: logoutIcon,
		},
	];

	const [openProfile, setOpenProfile] = useState(false);

	return (
		<div className="profile" onClick={() => setOpenProfile(!openProfile)}>
			<img src={user} alt="" />
			{openProfile && (
				<ul>
					{profileOptions.map((option) => (
						<li key={option.text}>
							<img src={option.img} alt="" /> {option.text}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default ProfileMenu;
