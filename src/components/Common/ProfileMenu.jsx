import React, { useContext, useState } from "react";
import { VscAccount } from "react-icons/vsc";
import { CiUser, CiSettings, CiLogout } from "react-icons/ci";
import "./common.scss";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../services/helper";

function ProfileMenu() {
	const navigate = useNavigate();

	const profileOptions = [
		{
			text: "view profile",
			icon: <CiUser />,
		},
		{
			text: "settings",
			icon: <CiSettings />,
		},
		{
			text: "logout",
			icon: <CiLogout />,
		},
	];

	const [openProfile, setOpenProfile] = useState(false);

	const handleClick = async (text) => {
		if (text === "view profile") {
			navigate("/user-profile");
		}

		if (text === "logout") {
			setCookie("userId", "");
			localStorage.removeItem("profileExists");
			navigate("/");
		}
	};

	return (
		<div className="profile" onClick={() => setOpenProfile(!openProfile)}>
			<VscAccount className="profile-icon" />
			{openProfile && (
				<ul>
					{profileOptions.map((option) => (
						<li
							key={option.text}
							onClick={() => handleClick(option.text)}>
							{option.icon} {option.text}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default ProfileMenu;
