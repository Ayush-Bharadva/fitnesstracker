import { useEffect, useState, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import { isUserLoggedIn, setCookie } from "../../../utils/helper";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import "./Header.scss";
import Logo from "./Logo";

function Header() {
	const location = useLocation();
	const pathName = location.pathname;
	const navigate = useNavigate();

	const [burgerMenu, setBurgerMenu] = useState(false);
	const userLoggedIn = isUserLoggedIn();
	const navItemsRef = useRef(null);

	const isActive = path => (pathName === path ? "Active" : "");

	useEffect(() => {
		navItemsRef.current?.classList.toggle("display-none", !burgerMenu);
	}, [burgerMenu]);

	const handleLogout = () => {
		setCookie("userId", "");
		setBurgerMenu(false);
		navigate("/");
	};

	const burgerBtn = burgerMenu ? (
		<RxCross1
			className="close-burger-btn"
			onClick={() => setBurgerMenu(prev => !prev)}
		/>
	) : (
		<GiHamburgerMenu
			className="burger-btn"
			onClick={() => setBurgerMenu(prev => !prev)}
		/>
	);
	return (
		<header className="navbar">
			<Logo />
			{userLoggedIn ? (
				<>
					<ul className="nav-items" ref={navItemsRef}>
						<li className="nav-item" onClick={() => setBurgerMenu(p => !p)}>
							<NavLink className={`link ${isActive("/")}`} to="/"> Home </NavLink>
						</li>
						<li className="nav-item" onClick={() => setBurgerMenu(p => !p)}>
							<NavLink className={`link ${isActive("/user-profile")}`} to="user-profile"> User Profile </NavLink>
						</li>
						<li className="nav-item" onClick={() => setBurgerMenu(p => !p)}>
							<NavLink className={`link ${isActive("/daily-logs")}`} to="/daily-logs"> Daily Logs </NavLink>
						</li>
						<li className="nav-item" onClick={() => setBurgerMenu(p => !p)}>
							<NavLink className={`link ${isActive("/dashboard")}`} to="/dashboard"> Dashboard </NavLink>
						</li>
						<button type="button" className="mobile-logout-btn" onClick={handleLogout}> Logout </button>
					</ul>
					{burgerBtn}
					<ProfileMenu />
				</>
			) : (
				<NavLink to="auth" className="login"> LogIn </NavLink>
			)}
		</header>
	);
}

export default Header;
