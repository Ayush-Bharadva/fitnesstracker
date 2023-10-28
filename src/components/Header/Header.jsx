import React from "react";
import { NavLink } from "react-router-dom";
import ProfileMenu from "../ProfileMenu";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";

function Header() {
	const { isSignedUp, isLoggedIn } = useContext(AuthContext);

	return (
		<header className="header">
			<nav className="navbar">
				<h1 className="logo">
					<NavLink className="logo-text" to="/">
						FT
						{/* Add Image Logo */}
					</NavLink>
				</h1>
				<ul className="nav-items">
					<li className="nav-item">
						<NavLink className="link" to="/">
							Home
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="link" to="user-profile">
							User Profile
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="link" to="/daily-goals">
							Daily Goals
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="link" to="/weight-tracking">
							Weight Tracking
						</NavLink>
					</li>
				</ul>
				{!(isSignedUp || isLoggedIn) ? (
					<div className="buttons">
						<NavLink to="login">
							<button className="login">LogIn</button>
						</NavLink>
						<NavLink to="signup">
							<button className="signup">SignUp</button>
						</NavLink>
					</div>
				) : (
					<ProfileMenu />
				)}
			</nav>
		</header>
	);
}

export default Header;
