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

export function handleLogout() {
	setCookie("userId", "");
	localStorage.removeItem("profileExists");
	// navigate("/");
}

export function setProfileStatus(value) {
	localStorage.setItem("profileExists", value);
}

export function getProfileStatus() {
	const profileStatus = localStorage.getItem("profileExists");
	return !!profileStatus;
}

export const isPasswordValid = (password) => {
	let passwordError = "";

	if (password.length <= 5) {
		passwordError = " Password length should be > 5 ";
		return passwordError;
	}

	// special character checking
	const specialCharacterPattern = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\|/]/;
	if (!specialCharacterPattern.test(password)) {
		passwordError = "Password must contain special characters";
		return passwordError;
	}

	// digit checking checking
	const digitPattern = /\d/;
	if (!digitPattern.test(password)) {
		passwordError = "Password must contain atleast one digit";
		return passwordError;
	}

	// alphabets checking
	const alphabetPattern = /[a-zA-Z]/;
	if (!alphabetPattern.test(password)) {
		passwordError = "Password must contain atleast one alphabet";
		return passwordError;
	}

	return true;
};
