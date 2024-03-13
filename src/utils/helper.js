import { toast } from "react-toastify";

export function getCookie(name) {
	const allCookies = document.cookie.split(";");
	for (const cookie of allCookies) {
		const [cookieName, cookieValue] = cookie.split("=");
		if (cookieName.trim() === name) {
			return cookieValue;
		}
	}
	return null; // cookie not found
}

export function setCookie(cookieName, cookieValue) {
	document.cookie = `${cookieName}=${cookieValue}`;
}

export function isUserLoggedIn() {
	const userId = getCookie("userId");
	return !!userId;
}

export const handleKeyDown = event => {
	if (event.keyCode === 13) {
		event.preventDefault();
	}
};

export const getTodaysDate = () => {
	const todayDate = new Date();
	return todayDate.toJSON().split("T")[0];
};

export const showToast = (type, message) => {
	toast[type](message, { position: toast.POSITION.TOP_RIGHT });
};

export const capitalizeFirstLetter = string => {
	return string[0].toUpperCase() + string.substring(1);
};

export const validatePassword = value => {
	const specialCharacterPattern = /[!@#$%^&*()_+{}[\]:;<>,.?~\\|/]/;
	const digitPattern = /\d/;
	const alphabetPattern = /[a-zA-Z]/;

	if (value.length <= 5) {
		return "Password must contain more than 5 characters";
	} else if (!specialCharacterPattern.test(value)) {
		return "Password must contain a special character";
	} else if (!digitPattern.test(value)) {
		return "Password must contain at least one digit";
	} else if (!alphabetPattern.test(value)) {
		return "Password must contain at least one alphabet";
	} else {
		return "";
	}
};
