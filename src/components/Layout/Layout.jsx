import Header from "../Common/Header/Header";
import Footer from "../Common/Footer/Footer";
import { Outlet } from "react-router-dom";

function Layout() {
	return (
		<section className="main-section">
			<Header />
			<Outlet />
			<Footer />
		</section>
	);
}

export default Layout;
