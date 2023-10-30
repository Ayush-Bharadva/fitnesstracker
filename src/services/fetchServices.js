import axios from "axios";

// fetch function calls
const signUpUrl = "http://localhost:8080/user/signup"; // POST
const logInUrl = "http://localhost:8080/user/login"; // POST
const createUserUrl = "http://localhost:8080/user/profile/add"; //GET

// SignUp User
export async function handleUserSignUp(userCredentials) {
	try {
		const response = await axios.post(
			signUpUrl,
			JSON.stringify(userCredentials)
		);
		return response.data;
	} catch (error) {
		console.log("SignUp error :", error);
	}
}

// LogIn User
export async function handleUserLogIn(userCredentials) {
	try {
		const response = await axios.post(
			logInUrl,
			JSON.stringify(userCredentials)
		);
		return response.data;
	} catch (error) {
		console.log("LogIn error :", error);
	}
}

// CreateProfile
export async function createUserProfile(userInfo) {
	try {
		const response = await axios.get(
			createUserUrl,
			JSON.stringify(userInfo)
		);
		return response;
	} catch (error) {
		console.log("create user profile error :", error);
	}
}
