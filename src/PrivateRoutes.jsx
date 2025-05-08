import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "./utils/helper";

function PrivateRoutes() {
	const userId = getCookie("userId");
	return userId ? <Outlet /> : <Navigate to="/auth" />;
}

export default PrivateRoutes;
