import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Card from "../Common/Card";
import poster from "../../assets/images/signup_poster.jpg";
import { userSignUpService } from "../../services/services";
import { isPasswordValid, setCookie } from "../../utils/helper";
// import "../styles/General.scss";
import "./SignUp.scss";
import Loader from "../Common/Loader";

function SignUp() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const [info, setInfo] = useState({
		fullname: "",
		email: "",
		password: "",
		"confirm-password": "",
		errors: {
			fullname: "",
			email: "",
			password: "",
			"confirm-password": "",
		},
	});

	const showToast = (type, message = "temp") => {
		toast[type](message, { position: toast.POSITION.TOP_RIGHT });
	};

	const displayError = (field) => {
		const errorMessage = info.errors[field];
		return (
			errorMessage.length && (
				<div className="error-message">{errorMessage}</div>
			)
		);
	};

	const handleChange = (input, value) => {
		setInfo((prevInfo) => ({
			...prevInfo,
			[input]: value,
			errors: {
				...prevInfo.errors,
				[input]: input === password && isPasswordValid(value),
			},
		}));
	};

	// function for password validation
	// const isPasswordValid = (password) => {
	// 	if (password.length <= 5) {
	// 		setInfo((prev) => ({
	// 			...prev,
	// 			errors: {
	// 				...prev.errors,
	// 				password: "password length should be > 5",
	// 			},
	// 		}));
	// 		return false;
	// 	}

	// 	// special character checking
	// 	const specialCharacterPattern = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\|/]/;
	// 	if (!specialCharacterPattern.test(password)) {
	// 		setInfo((prev) => ({
	// 			...prev,
	// 			errors: {
	// 				...prev.errors,
	// 				password:
	// 					"password must contain atleast one special character",
	// 			},
	// 		}));
	// 		return false;
	// 	}

	// 	// digit checking checking
	// 	const digitPattern = /\d/;
	// 	if (!digitPattern.test(password)) {
	// 		setInfo((prev) => ({
	// 			...prev,
	// 			errors: {
	// 				...prev.errors,
	// 				password: "password should contain atleast one digit",
	// 			},
	// 		}));
	// 		return false;
	// 	}

	// 	// alphabets checking
	// 	const alphabetPattern = /[a-zA-Z]/;
	// 	if (!alphabetPattern.test(password)) {
	// 		setInfo((prev) => ({
	// 			...prev,
	// 			errors: {
	// 				...prev.errors,
	// 				password: "password must contain alphabets",
	// 			},
	// 		}));
	// 		return false;
	// 	}

	// 	setInfo((prev) => ({
	// 		...prev,
	// 		errors: {
	// 			...prev.errors,
	// 			password: "",
	// 		},
	// 	}));
	// 	return true;
	// };

	// function to check validity of password and email
	const isValidCredentials = () => {
		const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

		let isValidEmail = emailPattern.test(info.email);
		let isValidPassword = isPasswordValid(info.password);

		const passwordError = isPasswordValid(info.password);

		if (!isValidEmail) {
			console.log("Invalid Email");
			// showToast("error", info.errors.email);
		}

		if (!isValidPassword) {
			console.log("Invalid Password");
			// showToast("error", info.errors.password);
		}

		console.log(
			isValidEmail,
			isValidPassword,
			info["password"] === info["confirm-password"]
		);

		return (
			isValidEmail &&
			!!passwordError &&
			info["password"] === info["confirm-password"]
		);
	};

	const handleSignUp = async () => {
		const { fullname, email, password } = info;

		setLoading(true);

		const response = await userSignUpService({
			fullname: fullname,
			email: email,
			password: password,
		});

		setLoading(false);

		console.log(response);

		if (response.code === 409) {
			setInfo((prevError) => ({
				...prevError,
				errors: {
					...prevError.errors,
					email: "Email registed already..",
				},
			}));
			showToast("error", "Email registed already..");
		} else if (response.status === 200) {
			setCookie("userId", response.data.userId);
			navigate("/");
		} else {
			showToast("error", "Sign up failed. Please try again.");
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isValidCredentials()) {
			handleSignUp();
		} else {
			console.log("credentials are not proper");
		}
	};

	return (
		<>
			{/* <div className="container"> */}
			{loading ? (
				<Loader color="#37455f" height="64px" width="64px" />
			) : (
				<Card>
					<div className="signup-card">
						<h2>Create Account</h2>
						<form
							action=""
							className="signup-form"
							onSubmit={handleSubmit}>
							<input
								type="text"
								id="fullname"
								value={info["fullname"]}
								onChange={(e) =>
									handleChange("fullname", e.target.value)
								}
								placeholder="fullname"
								required
							/>
							<input
								type="email"
								id="email"
								value={info["email"]}
								onChange={(e) =>
									handleChange("email", e.target.value)
								}
								placeholder="email"
								required
							/>
							{/* {displayError("email")} */}
							<input
								type="password"
								id="password"
								value={info["password"]}
								onChange={(e) =>
									handleChange("password", e.target.value)
								}
								placeholder="password"
								autoComplete="on"
								required
							/>
							{/* {displayError("password")} */}
							<input
								type="password"
								id="confirm-password"
								value={info["confirm-password"]}
								onChange={(e) =>
									handleChange(
										"confirm-password",
										e.target.value
									)
								}
								placeholder="confirm-password"
								autoComplete="on"
								required
							/>
							{/* {displayError("confirm-password")} */}
							<button type="submit" className="signup-btn">
								Sign Up
							</button>
						</form>
						<p>
							Already have an account ?{" "}
							<span onClick={() => navigate("/login")}>
								Log In
							</span>
						</p>
					</div>
					<div className="signup-poster">
						<img src={poster} alt="" />
					</div>
				</Card>
			)}

			{/* </div> */}
			<ToastContainer />
		</>
	);
}

export default SignUp;
