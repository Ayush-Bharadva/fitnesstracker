import axios from "axios";

// fetch function calls
const signUpUrl = "http://localhost:8080/user/signup";
const logInUrl = "http://localhost:8080/user/login";

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
