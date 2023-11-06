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
	console.log("checking user status :", !!userId);
	return !!userId;
}

// function to validate password
// const [error, setError] = useState({
// 	fullname: "",
// 	email: "",
// 	password: "",
// 	"confirm-password": "",
// });

// export const isPasswordValid = (password) => {
// 	if (password.length <= 5) {
// 		setError((prevError) => ({
// 			...prevError,
// 			password: "password lenght should more than 5",
// 		}));
// 		return false;
// 	}

// 	// special character checking
// 	const specialCharacterPattern = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\|/]/;
// 	if (!specialCharacterPattern.test(password)) {
// 		setError((prevError) => ({
// 			...prevError,
// 			password: "password must contain atleast one special character",
// 		}));
// 		return false;
// 	}

// 	// digit checking checking
// 	const digitPattern = /\d/;
// 	if (!digitPattern.test(password)) {
// 		setError((prevError) => ({
// 			...prevError,
// 			password: "password must contain atleast one digit",
// 		}));
// 		return false;
// 	}

// 	// alphabets checking
// 	const alphabetPattern = /[a-zA-Z]/;
// 	if (!alphabetPattern.test(password)) {
// 		setError((prevError) => ({
// 			...prevError,
// 			password: "password must contain alphabets",
// 		}));
// 		return false;
// 	}

// 	setError((prevError) => ({ ...prevError, password: "" }));
// 	return true;
// };
