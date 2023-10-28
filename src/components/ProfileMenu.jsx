import React, { useContext, useState } from "react";
import axios from "axios";
import user from "../assets/icons/user.png";
import userIcon from "../assets/icons/userIcon.png";
import settingsIcon from "../assets/icons/settingsIcon.png";
import logoutIcon from "../assets/icons/logoutIcon.png";
import historyIcon from "../assets/icons/historyIcon.png";
import { AuthContext } from "../contexts/AuthProvider";

const logOutUrl = "http://localhost:8080/user/logout";

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

	const { signOut, logOut } = useContext(AuthContext);

	const handleClick = (text) => {
		if (text === "logout") {
			axios
				.get(logOutUrl)
				.then((response) => {
					if (response.statusText === "OK") {
						signOut();
						logOut();
					}
				})
				.catch((error) => console.log("logout failed :", error));
		}
	};

	return (
		<div className="profile" onClick={() => setOpenProfile(!openProfile)}>
			<img src={user} alt="" />
			{openProfile && (
				<ul>
					{profileOptions.map((option) => (
						<li
							key={option.text}
							onClick={() => handleClick(option.text)}>
							<img src={option.img} alt="" /> {option.text}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default ProfileMenu;
