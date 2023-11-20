import { Suspense, lazy } from "react";
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import "./App.scss";
import Layout from "./Layout";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";

const Home = lazy(() =>
	import("./pages/index").then((module) => {
		return { default: module.Home };
	})
);
const UserProfile = lazy(() =>
	import("./pages/index").then((module) => {
		return { default: module.UserProfile };
	})
);
const DailyGoals = lazy(() =>
	import("./pages/index").then((module) => {
		return { default: module.DailyGoals };
	})
);
const WeightTracking = lazy(() =>
	import("./pages/index").then((module) => {
		return { default: module.WeightTracking };
	})
);
const Dashboard = lazy(() =>
	import("./pages/index").then((module) => {
		return { default: module.Dashboard };
	})
);

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<Layout />}>
				<Route path="" element={<Home />} />
				<Route path="user-profile" element={<UserProfile />} />
				<Route path="daily-goals" element={<DailyGoals />} />
				<Route path="dashboard" element={<Dashboard />} />
			</Route>
			<Route path="signup" element={<SignUp />} />
			<Route path="login" element={<Login />} />
		</>
	)
);

function App() {
	return (
		<Suspense fallback={<h1>Loading...</h1>}>
			<RouterProvider router={router} />
		</Suspense>
	);
}

export default App;
