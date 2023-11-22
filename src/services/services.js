import axios from "axios";
import { getCookie } from "./helper";
const baseApiUrl = "https://fitnesstracker-k5h0.onrender.com";
const userApiUrl = `${baseApiUrl}/user`;
const userProfileApiUrl = `${userApiUrl}/profile`;
const userExerciseApiUrl = `${userApiUrl}/exercise`;
const userMealApiUrl = `${userApiUrl}/meal`;

const url = "https://fitnesstracker-k5h0.onrender.com/login";

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

// to get all details from date
export async function getDetailsFromDateService(currentDate) {
	try {
		const response = await createApiInstance.get(
			`${userApiUrl}/alldetails`,
			{
				params: currentDate,
			}
		);
		return response;
	} catch (error) {
		console.log("get all details error :", error);
		return error.response;
	}
}

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
export async function deleteExerciseService(type) {
	try {
		const response = await createApiInstance.delete(
			`${userExerciseApiUrl}`,
			{
				params: {
					exercisetype: type,
				},
			}
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
export async function deleteMealService(type) {
	try {
		const response = createApiInstance.delete(`${userMealApiUrl}`, {
			params: { mealtype: type },
		});
		return response;
	} catch (error) {
		console.log("delete meal error :", error);
		return error.response.data;
	}
}

/***************************get-yearly-data**************************/

export async function getYearlyWeightDetailService(year) {
	try {
		console.log("weight api");
		const response = createApiInstance.get(
			`${userApiUrl}/yearly-weight-details`,
			{
				params: {
					date: year,
				},
			}
		);
		console.log("response :", response);
		return response;
	} catch (error) {
		console.log("get yearly weight data error :", error);
	}
}

export async function getYearlyCaloriesDetailService(year) {
	try {
		const response = createApiInstance.get(
			`${userApiUrl}/yearly-caloriesburned-details`,
			{
				params: {
					date: year,
				},
			}
		);
		return response;
	} catch (error) {
		console.log("get yearly calorie data error :", error);
	}
}

/****************************weight-service*****************************/
export async function addWeightService(weightInfo) {
	try {
		const response = createApiInstance.post(`${userApiUrl}/weight`, {
			dailyWeight: weightInfo,
		});
		return response;
	} catch (error) {
		console.log("add weight error :", error);
		return error.response;
	}
}

export async function editWeightService(weightInfo) {
	try {
		const response = createApiInstance.put(`${userApiUrl}/weight`, {
			dailyWeight: weightInfo,
		});
		return response;
	} catch (error) {
		console.log("edit weight error :", error);
		return error.response;
	}
}

export async function deleteWeightService() {
	try {
		const response = createApiInstance.delete(`${userApiUrl}/weight`);
		return response;
	} catch (error) {
		console.log("delete weight error :", error);
		return error.response;
	}
}
