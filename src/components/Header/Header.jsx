import React, { useEffect, useState, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import ProfileMenu from "../Common/ProfileMenu";
import { isUserLoggedIn, setCookie } from "../../utils/helper";
import { GiHamburgerMenu } from "react-icons/gi";
import "./Header.scss";

function Header() {
	const location = useLocation();
	const pathName = location.pathname;
	const [burgerMenu, setBurgerMenu] = useState(false);
	const navItemsRef = useRef(null);
	const navigate = useNavigate();

	useEffect(() => {
		if (burgerMenu) {
			navItemsRef.current?.classList.remove("display-none");
		} else {
			navItemsRef.current?.classList.add("display-none");
		}
	}, [burgerMenu]);

	const handleLogout = () => {
		setCookie("userId", "");
		setBurgerMenu(false);
		navigate("/");
	};

	return (
		<header className="navbar">
			<h1 className="logo">
				<NavLink className="logo-text" to="/">
					<span>Fit</span>
					<span style={{ color: "#06ccb2" }}>Tracker</span>
				</NavLink>
			</h1>
			{isUserLoggedIn() ? (
				<>
					<ul className="nav-items" ref={navItemsRef}>
						<li
							className="nav-item"
							onClick={() => setBurgerMenu((p) => !p)}>
							<NavLink
								className={`link ${
									pathName === "/" ? "active" : ""
								}`}
								to="/">
								Home
							</NavLink>
						</li>
						<li
							className="nav-item"
							onClick={() => setBurgerMenu((p) => !p)}>
							<NavLink
								className={`link ${
									pathName === "/user-profile" ? "active" : ""
								}`}
								to="user-profile">
								User Profile
							</NavLink>
						</li>
						<li
							className="nav-item"
							onClick={() => setBurgerMenu((p) => !p)}>
							<NavLink
								className={`link ${
									pathName === "/daily-goals" ? "active" : ""
								}`}
								to="/daily-goals">
								Daily Goals
							</NavLink>
						</li>
						<li
							className="nav-item"
							onClick={() => setBurgerMenu((p) => !p)}>
							<NavLink
								className={`link ${
									pathName === "/dashboard" ? "active" : ""
								}`}
								to="/dashboard">
								Dashboard
							</NavLink>
						</li>
						{isUserLoggedIn() && (
							<button
								className="mobile-logout-btn"
								onClick={handleLogout}>
								{" "}
								Logout{" "}
							</button>
						)}
					</ul>
					<GiHamburgerMenu
						className="burger-btn"
						onClick={() => setBurgerMenu((prev) => !prev)}
					/>
					<ProfileMenu className="profile-menu" />
				</>
			) : (
				<div className="buttons">
					<NavLink to="auth">
						<button className="login">LogIn</button>
					</NavLink>
					{/* <NavLink to="auth">
						<button className="signup">SignUp</button>
					</NavLink> */}
				</div>
			)}
		</header>
	);
}

export default Header;
