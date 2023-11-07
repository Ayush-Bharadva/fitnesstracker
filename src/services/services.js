import axios from "axios";
import { getCookie } from "./helper";
const baseApiUrl = "http://192.168.1.169:8081";
const userApiUrl = `${baseApiUrl}/user`;
const userProfileApiUrl = `${userApiUrl}/profile`;
const userExerciseApiUrl = `${userApiUrl}/exercise`;
const userMealApiUrl = `${userApiUrl}/meal`;

// create axios instance with common headers
const userId = getCookie("userId");
const headers = {
	Authorization: userId,
	"Content-Type": "application/json",
};
const createApiInstance = axios.create({
	baseURL: baseApiUrl,
	headers: headers,
});

createApiInstance.interceptors.request.use((config) => {
	const userId = getCookie("userId");
	config.headers.Authorization = userId;
	return config;
});

// createApiInstance.interceptors.response.use((config) => {
// 	const userId = getCookie("userId");
// 	config.headers.Authorization = userId;
// 	return config;
// });

// const post = async (url, body) => {
// 	const userId = getCookie("userId");

// 	return await createApiInstance.post(url, body, {
// 		headers: { ...headers, Authorization: userId },
// 	});
// };
// SignUp User
export async function userSignUpService(userCredentials) {
	try {
		const response = await axios.post(
			`${baseApiUrl}/signup`,
			userCredentials
		);
		return response;
	} catch (error) {
		console.log("signup error :", error);
		return error.response.data;
	}
}

// LogIn User
export async function userLogInService(userCredentials) {
	try {
		const response = await axios.post(
			`${baseApiUrl}/login`,
			userCredentials
		);
		return response;
	} catch (error) {
		console.log("logIn error :", error);
		return error.response.data;
	}
}

// LogOut User
// export async function userLogOutService() {
// 	try {
// 		const response = await axios.get(`${userApiUrl}/logout`);
// 		return response;
// 	} catch (error) {
// 		console.log("logout error :", error);
// 		return error.response.data;
// 	}
// }

/******************profile services**************************/
// CreateProfile
export async function createUserProfileService(userInfo) {
	try {
		const response = await createApiInstance.put(
			`${userProfileApiUrl}`,
			userInfo
		);
		console.log(userId);
		return response;
	} catch (error) {
		console.log("create user profile error :", error);
		return error.response.data;
	}
}

// ShowUserProfile
export async function showUserProfileService() {
	try {
		const response = await createApiInstance.get(
			`${userProfileApiUrl}/show`
		);
		return response;
	} catch (error) {
		console.log("show user profile error :", error);
		return error.response.data;
	}
}

// UpdateUserProfile
export async function updateUserProfileService(userInfo) {
	try {
		const response = await createApiInstance.put(
			`${userProfileApiUrl}/update`,
			userInfo
		);
		return response;
	} catch (error) {
		console.log("update user profile error :", error);
		return error.response.data;
	}
}

// deleteUserProfile (not necessary)
// export async function deleteUserProfileService() {
// 	try {
// 		const response = await createApiInstance.delete(
// 			`${userProfileApiUrl}/delete`
// 		);
// 		return response;
// 	} catch (error) {
// 		console.log("delete user profile error :", error);
// 		return error.response.data;
// 	}
// }

/**************************exercise services************************************/
// add exercise
export async function addExerciseService(exerciseInfo) {
	try {
		const response = await createApiInstance.post(
			`${userExerciseApiUrl}`,
			exerciseInfo
		);
		return response;
	} catch (error) {
		console.log("add exercise error :", error);
		return error.response.data;
	}
}

// show/get exercise
export async function showExerciseService(currentDate) {
	try {
		console.log(currentDate);
		const response = await createApiInstance.get(`${userExerciseApiUrl}`, {
			params: currentDate,
		});
		return response;
	} catch (error) {
		console.log("get exercise error :", error);
		return error.response;
	}
}

// update exercise
export async function updateExerciseServise(exerciseInfo) {
	try {
		const response = await createApiInstance.put(
			`${userExerciseApiUrl}`,
			exerciseInfo
		);
		return response;
	} catch (error) {
		console.log("update exercise error :", error);
		return error.response.data;
	}
}

// delete exercise
export async function daleteExerciseService() {
	try {
		const response = await createApiInstance.delete(
			`${userExerciseApiUrl}`
		);
		return response;
	} catch (error) {
		console.log("delete exercise error :", error);
		return error.response.data;
	}
}

/*****************meal services**************************/
// add meal service
export async function addMealService(mealInfo) {
	try {
		const response = createApiInstance.post(`${userMealApiUrl}`, mealInfo);
		return response;
	} catch (error) {
		console.log("add meal error :", error);
		return error.response.data;
	}
}

// show meal service
export async function showMealService(currentDate) {
	try {
		const response = createApiInstance.get(`${userMealApiUrl}`, {
			params: currentDate,
		});
		return response;
	} catch (error) {
		console.log("show meal error :", error);
		return error.response.data;
	}
}

// update meal service
export async function updateMealService(mealInfo) {
	try {
		const response = createApiInstance.put(`${userMealApiUrl}`, mealInfo);
		return response;
	} catch (error) {
		console.log("update meal error :", error);
		return error.response.data;
	}
}

// delete meal service
export async function deleteMealService() {
	try {
		const response = createApiInstance.delete(`${userMealApiUrl}`);
		return response;
	} catch (error) {
		console.log("delete meal error :", error);
		return error.response.data;
	}
}
