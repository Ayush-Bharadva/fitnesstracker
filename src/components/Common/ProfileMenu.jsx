import React, { useState } from "react";
import { VscAccount } from "react-icons/vsc";
import { CiUser, CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../utils/helper";
import "./ProfileMenu.scss";

function ProfileMenu(props) {
	const navigate = useNavigate();

	const profileOptions = [
		{
			text: "logout",
			icon: <CiLogout />,
		},
	];

	const [openProfile, setOpenProfile] = useState(false);

	const handleClick = (text) => {
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
		<div
			className={"profile " + props.className}
			onClick={() => setOpenProfile(!openProfile)}>
			{props.className === "mobile-menu" ? (
				<button>Btn</button>
			) : (
				<VscAccount className="profile-icon" />
			)}
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
