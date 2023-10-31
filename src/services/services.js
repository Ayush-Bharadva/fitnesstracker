import axios from "axios";

// fetch function calls
const signUpUrl = "http://localhost:8080/user/signup"; // POST
const logInUrl = "http://localhost:8080/user/login"; // POST
const createUserUrl = "http://192.168.1.169:8081/user/profile/add"; //GET

// SignUp User
export async function userSignUpService(userCredentials) {
	try {
		const response = await axios.post(
			signUpUrl,
			JSON.stringify(userCredentials)
		);
		return response;
	} catch (error) {
		console.log("SignUp error :", error);
	}
}

// LogIn User
export async function userLogInService(userCredentials) {
	try {
		const response = await axios.post(
			logInUrl,
			JSON.stringify(userCredentials)
		);
		return response;
	} catch (error) {
		console.log("LogIn error :", error);
	}
}

// CreateProfile
export async function createUserProfileService(userInfo) {
	try {
		const response = await axios.get(createUserUrl, userInfo);
		return response;
	} catch (error) {
		console.log("create user profile error :", error);
	}
}
