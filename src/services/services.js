import axios from "axios";

// services api
const signUpUrl = "http://192.168.1.169:8081/user/signup"; // POST
const logInUrl = "http://192.168.1.169:8081/user/login"; // POST
const logOutUrl = "http://192.168.1.169:8081/user/logout"; // GET

const createUserUrl = "http://192.168.1.169:8081/user/profile/add"; //GET
const showUserUrl = "http://192.168.1.169:8081/user/profile/show"; //GET
const updateUserUrl = "http://192.168.1.169:8081/user/profile/update"; //GET

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

// LogOut User
export async function userLogOutService() {
	try {
		const response = await axios.get(logOutUrl);
		return response;
	} catch (error) {
		console.log("LogOut error :", error);
	}
}

// CreateProfile
export async function createUserProfileService(userInfo) {
	try {
		console.log(userInfo);
		const response = await axios.get(
			createUserUrl,
			JSON.stringify(userInfo),
			{ withCredentials: true }
		);
		return response;
	} catch (error) {
		console.log("create user profile error :", error);
	}
}

// ShowUserProfile
export async function showUserProfileService() {
	try {
		const response = await axios.get(showUserUrl);
		return response;
	} catch (error) {
		console.log("show user profile error :", error);
	}
}

// UpdateUserProfile
export async function updateUserProfileService(userInfo) {
	try {
		const response = await axios.get(updateUserUrl);
		return response;
	} catch (error) {
		console.log("update user profile error :", error);
	}
}
