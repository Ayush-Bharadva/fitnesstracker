import { Suspense, lazy } from "react";
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements
} from "react-router-dom";
import "./App.scss";
import "./global.scss";
import Layout from "./Layout";
import AuthForm from "./components/AuthForm/AuthForm";
import Loader from "./components/Common/Loader";
import ForgotPasswordPage from "./components/AuthForm/ForgotPasswordPage";
import { ToastContainer } from "react-toastify";
import PrivateRoutes from "./PrivateRoutes";

const dynamicImport = path =>
	lazy(() => import("./pages/index").then(module => ({ default: module[path] })));

const Home = dynamicImport("Home");
const UserProfile = dynamicImport("UserProfile");
const DailyLogs = dynamicImport("DailyLogs");
const Dashboard = dynamicImport("Dashboard");

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route element={<PrivateRoutes />}>
				<Route
					path="/"
					element={<Layout />}>
					<Route
						path=""
						element={<Home />}
					/>
					<Route
						path="user-profile"
						element={<UserProfile />}
					/>
					<Route
						path="daily-logs"
						element={<DailyLogs />}
					/>
					<Route
						path="dashboard"
						element={<Dashboard />}
					/>
				</Route>
			</Route>
			<Route
				path="/auth"
				element={<AuthForm />}
			/>
			<Route
				path="auth/forgot-password"
				element={<ForgotPasswordPage />}
			/>
		</>
	)
);

function App() {
	return (
		<Suspense fallback={<Loader />}>
			<RouterProvider router={router} />
			<ToastContainer
				position="top-right"
				autoClose={1500}
				hideProgressBar
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover={false}
			/>
		</Suspense>
	);
}

export default App;
