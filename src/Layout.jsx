import React, { Suspense } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";

function Layout() {
	return (
		<>
			<Header />
			<Suspense fallback={<h1>Loading...</h1>}>
				<Outlet />
			</Suspense>
			<Footer />
		</>
	);
}

export default Layout;
