import React, { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isSignedUp, setIsSignedUp] = useState(false);

	const signUp = () => {
		setIsSignedUp(true);
	};
	const signOut = () => {
		setIsSignedUp(false);
	};
	const logIn = () => {
		setIsLoggedIn(true);
	};
	const logOut = () => {
		setIsLoggedIn(false);
	};

	return (
		<AuthContext.Provider
			value={{ isLoggedIn, isSignedUp, signUp, signOut, logIn, logOut }}>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthProvider;
