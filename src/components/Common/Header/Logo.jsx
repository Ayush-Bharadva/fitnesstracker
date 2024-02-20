import { NavLink } from "react-router-dom";

function Logo() {
	return (
		<h1 className="logo">
			<NavLink
				className="logo-text"
				to="/">
				<span>Fit</span>
				<span style={{ color: "#06ccb2" }}>Tracker</span>
			</NavLink>
		</h1>
	);
}

export default Logo;
