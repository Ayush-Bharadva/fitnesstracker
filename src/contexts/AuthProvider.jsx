import React, { createContext, useState } from "react";
import { getCookie, isUserLoggedIn } from "../services/helper";

export const AuthContext = createContext();

function AuthProvider({ children }) {
	const logInStatus = isUserLoggedIn() || "";
	console.log("logInStatus :", logInStatus);

	return (
		<AuthContext.Provider value={{ logInStatus }}>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthProvider;
