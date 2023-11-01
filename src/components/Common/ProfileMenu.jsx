import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { VscAccount } from "react-icons/vsc";
import { CiUser, CiSettings, CiLogout } from "react-icons/ci";
import "./common.scss";
import { useNavigate } from "react-router-dom";
import { userLogOutService } from "../../services/services";

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

	const { signOut, logOut } = useContext(AuthContext);

	const handleClick = async (text) => {
		if (text === "view profile") {
			navigate("/user-profile");
		}

		if (text === "logout") {
			const response = await userLogOutService();
			if (response.statusText === "OK") {
				signOut();
				logOut();
			}
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
