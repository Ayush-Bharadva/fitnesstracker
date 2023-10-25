import { Suspense, lazy } from "react";
import "./App.scss";
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Layout";
// import {
// 	Home,
// 	UserProfile,
// 	DailyGoals,
// 	WeightTracking,
// } from "./components/pages/index";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";

const Home = lazy(() =>
	import("./components/pages/index").then((module) => {
		return { default: module.Home };
	})
);
const UserProfile = lazy(() =>
	import("./components/pages/index").then((module) => {
		return { default: module.UserProfile };
	})
);
const DailyGoals = lazy(() =>
	import("./components/pages/index").then((module) => {
		return { default: module.DailyGoals };
	})
);
const WeightTracking = lazy(() =>
	import("./components/pages/index").then((module) => {
		return { default: module.WeightTracking };
	})
);

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<Layout />}>
				<Route path="" element={<Home />} />
				<Route path="user-profile" element={<UserProfile />} />
				<Route path="daily-goals" element={<DailyGoals />} />
				<Route path="weight-tracking" element={<WeightTracking />} />
			</Route>
			<Route path="signup" element={<SignUp />} />
			<Route path="login" element={<Login />} />
		</>
	)
);

function App() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<RouterProvider router={router} />
		</Suspense>
	);
}

export default App;
