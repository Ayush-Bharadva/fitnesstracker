import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import ProfileMenu from "../Common/ProfileMenu";
import { isUserLoggedIn } from "../../utils/helper";
import "./Header.scss";

function Header() {
	const location = useLocation();
	const pathName = location.pathname;

	console.log(pathName);
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
						<NavLink
							className={`link ${
								pathName === "/" ? "active" : ""
							}`}
							to="/">
							Home
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink
							className={`link ${
								pathName === "/user-profile" ? "active" : ""
							}`}
							to="user-profile">
							User Profile
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink
							className={`link ${
								pathName === "/daily-goals" ? "active" : ""
							}`}
							to="/daily-goals">
							Daily Goals
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink
							className={`link ${
								pathName === "/dashboard" ? "active" : ""
							}`}
							to="/dashboard">
							Dashboard
						</NavLink>
					</li>
				</ul>
				{!isUserLoggedIn() ? (
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
