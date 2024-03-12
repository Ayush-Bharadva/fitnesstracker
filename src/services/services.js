import axios from "axios";
import { getCookie, showToast } from "../utils/helper";
import { toast } from "react-toastify";
const baseApiUrl = "https://fitnesstracker-k5h0.onrender.com";

const userApiUrl = `${baseApiUrl}/user`;
const userProfileApiUrl = `${userApiUrl}/profile`;

const userExerciseApiUrl = `${userApiUrl}/exercise`;
const userMealApiUrl = `${userApiUrl}/meal`;

const forgotPasswordApiUrl = `${baseApiUrl}/otp/request`;
const verifyOTPApiUrl = `${baseApiUrl}/otp/verify`;
const setNewPasswordApiUrl = `${baseApiUrl}/forgot-password`;

// axios instance with common headers
const headers = {
	"Content-Type": "application/json"
};
const createApiInstance = axios.create({
	baseURL: baseApiUrl,
	headers: headers
});

createApiInstance.interceptors.request.use(config => {
	const userId = getCookie("userId");
	if (userId) {
		config.headers.Authorization = userId;
	}
	return config;
});

createApiInstance.interceptors.response.use(
	response => response,
	error => {
		if (error.response.data.code === 498) {
			toast.error("Invalid token");
		} else if (error.response.data.code === 400) {
			toast.error("This record contains inconsistent or out-of-range data");
		} else if (error.response.data.code === 409) {
			toast.error(
				"This record contains duplicated data that conflicts with what is already in the database"
			);
		} else if (error.response.data.code === 500) {
			toast.error("Internal server error");
		} else {
			toast.error(error.response.data.message);
		}
	}
);

// get image url on Image upload
export async function getImageUrl(acceptedFiles) {
	const data = new FormData();
	data.append("file", acceptedFiles[0]);

	const options = {
		method: "POST",
		url: "https://upload-image-and-return-url-by-thichthicodeteam.p.rapidapi.com/api/upload-image",
		headers: {
			Accept: "*/*",
			"X-RapidAPI-Key": "7b9cb3e4bdmsh673fe14fd2c1338p1ac175jsnaa23464a349f",
			"X-RapidAPI-Host": "upload-image-and-return-url-by-thichthicodeteam.p.rapidapi.com"
		},
		data: data
	};
	try {
		const response = await axios.request(options);
		return response.data.link;
	} catch (error) {
		showToast("error", "Error loading Image!!");
	}
}

// SignUp User
export async function userSignUp(userCredentials) {
	try {
		const response = await createApiInstance.post(
			`${baseApiUrl}/signup`,
			userCredentials
		);
		return response;
	} catch (error) {
		showToast("error", "Error loading Image!!");
	}
}

// LogIn User
export async function userLogIn(userCredentials) {
	try {
		const response = await createApiInstance.post(`${baseApiUrl}/login`, userCredentials);
		return response;
	} catch (error) {
		return error.response.data;
	}
}

// forgot password / verify email
export async function verifyEmail(verifyEmailPayload) {
	try {
		const response = await axios.post(forgotPasswordApiUrl, verifyEmailPayload);
		return response;
	} catch (error) {
		return error.response.data;
	}
}

// verify-otp
export async function verifyOTP(verifyOtpPayload) {
	try {
		const response = await axios.post(verifyOTPApiUrl, verifyOtpPayload);
		return response;
	} catch (error) {
		return error.response.data;
	}
}

// set new password
export async function setNewPassword(resetPasswordPayload) {
	try {
		const response = await axios.post(setNewPasswordApiUrl, resetPasswordPayload);
		return response;
	} catch (error) {
		return error.response.data;
	}
}

// CreateUserProfile
export async function createUserProfile(userInfo) {
	try {
		const response = await createApiInstance.put(`${userProfileApiUrl}`, userInfo);
		return response;
	} catch (error) {
		return error.response.data;
	}
}

// ShowUserProfile
export async function fetchUserProfile() {
	try {
		const response = await createApiInstance.get(`${userProfileApiUrl}`);
		return response;
	} catch (error) {
		return error.response?.data;
	}
}

// UpdateUserProfile
export async function updateUserProfile(userInfo) {
	try {
		const response = await createApiInstance.put(`${userProfileApiUrl}/update`, userInfo);
		return response;
	} catch (error) {
		return error.response.data;
	}
}

// get all details from date
export async function getDetailsFromDate(currentDate) {
	try {
		const response = await createApiInstance.get(`${userApiUrl}/alldetails`, {
			params: currentDate
		});
		return response;
	} catch (error) {
		return error.response;
	}
}

// add exercise
export async function addExercise(exerciseInfo) {
	try {
		const response = await createApiInstance.post(`${userExerciseApiUrl}`, exerciseInfo);
		return response;
	} catch (error) {
		return error.response.data;
	}
}

// update exercise
export async function updateExercise(exerciseInfo) {
	try {
		const response = await createApiInstance.put(`${userExerciseApiUrl}`, exerciseInfo);
		return response;
	} catch (error) {
		return error.response.data;
	}
}

// delete exercise
export async function deleteExercise(type) {
	try {
		const response = await createApiInstance.delete(`${userExerciseApiUrl}`, {
			params: {
				exercisetype: type
			}
		});
		return response;
	} catch (error) {
		return error.response.data;
	}
}

// add meal
export async function addMeal(mealInfo) {
	try {
		const response = createApiInstance.post(`${userMealApiUrl}`, mealInfo);
		return response;
	} catch (error) {
		return error.response.data;
	}
}

// update meal
export async function updateMeal(mealInfo) {
	try {
		const response = createApiInstance.put(`${userMealApiUrl}`, mealInfo);
		return response;
	} catch (error) {
		return error.response.data;
	}
}

// delete meal
export async function deleteMeal(type) {
	try {
		const response = createApiInstance.delete(`${userMealApiUrl}`, {
			params: { mealtype: type }
		});
		return response;
	} catch (error) {
		return error.response.data;
	}
}

// yearly weight data
export async function getYearlyWeightDetail(year) {
	try {
		const response = createApiInstance.get(`${userApiUrl}/yearly-weight-details`, {
			params: {
				year
			}
		});
		return response;
	} catch (error) {
		return error.response;
	}
}

// yearly calories data
export async function getYearlyCaloriesDetail(year) {
	try {
		const response = createApiInstance.get(
			`${userApiUrl}/yearly-caloriesburned-details`,
			{
				params: {
					year
				}
			}
		);
		return response;
	} catch (error) {
		return error.response;
	}
}

// add weight
export async function addWeight(weightInfo) {
	try {
		const response = createApiInstance.post(`${userApiUrl}/weight`, {
			dailyWeight: weightInfo
		});
		return response;
	} catch (error) {
		return error.response;
	}
}

// update weight
export async function editWeight(weightInfo) {
	try {
		const response = createApiInstance.put(`${userApiUrl}/weight`, {
			dailyWeight: weightInfo
		});
		return response;
	} catch (error) {
		return error.response;
	}
}

// delete weight
export async function deleteWeight() {
	try {
		const response = createApiInstance.delete(`${userApiUrl}/weight`);
		return response;
	} catch (error) {
		return error.response;
	}
}

// add water
export async function addWater(waterInfo) {
	try {
		const response = createApiInstance.post(`${userApiUrl}/water`, {
			waterIntake: waterInfo
		});
		return response;
	} catch (error) {
		return error.response;
	}
}

// update water
export async function editWater(waterInfo) {
	try {
		const response = createApiInstance.put(`${userApiUrl}/water`, {
			waterIntake: waterInfo
		});
		return response;
	} catch (error) {
		return error.response;
	}
}

// delete water
export async function deleteWater() {
	try {
		const response = createApiInstance.delete(`${userApiUrl}/water`);
		return response;
	} catch (error) {
		return error.response;
	}
}
