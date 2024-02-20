import { useState } from "react";
import { PropTypes } from "prop-types";
import { VscAccount } from "react-icons/vsc";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../../utils/helper";
import "./ProfileMenu.scss";

function ProfileMenu(props) {
	const navigate = useNavigate();
	const [openProfile, setOpenProfile] = useState(false);

	const profileOptions = [
		{
			text: "logout",
			icon: <CiLogout />,
		},
	];

	const handleClick = () => {
		setCookie("userId", "");
		navigate("/");
	};

	return (
		<div
			className={"profile " + props.className}
			onClick={() => setOpenProfile(!openProfile)}>
			<VscAccount className="profile-icon" />
			{openProfile && (
				<ul>
					{profileOptions.map(option => (
						<li
							key={option.text}
							onClick={handleClick}>
							{option.icon} {option.text}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default ProfileMenu;

ProfileMenu.propTypes = {
	className: PropTypes.string,
};
