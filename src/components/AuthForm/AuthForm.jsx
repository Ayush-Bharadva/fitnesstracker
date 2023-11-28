import React, { useState } from "react";
import "./AuthForm.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { userLogInService, userSignUpService } from "../../services/services";
import { isPasswordValid, setCookie } from "../../utils/helper";
import Loader from "../Common/Loader";
import poster from "../../assets/images/signup_poster.jpg";
import BgGraphics from "../../assets/images/BgGraphics.png";

function AuthForm() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [isLoginForm, setIsLoginForm] = useState(true);
	const [formData, setFormData] = useState({
		fullname: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [inputError, setInputError] = useState({
		fullnameError: "",
		emailError: "",
		passwordError: "",
		confirmPasswordError: "",
	});

	const showToast = (type, message = "temp") => {
		toast[type](message, { position: toast.POSITION.TOP_RIGHT });
	};

	const handleChange = (input, value) => {
		setFormData((prevData) => ({ ...prevData, [input]: value }));

		/* Error checking */

		// check fullname
		if (input === "fullname") {
			setInputError((prevErrors) => ({
				...prevErrors,
				fullnameError:
					value.length < 5
						? "Fullname length should be greater than 4"
						: "",
			}));
			if (!value) {
				setInputError({ ...inputError, fullnameError: "" });
			}
		}

		// check email
		if (input === "email") {
			// console.log("email check");
			const emailPattern =
				/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

			setInputError(
				!emailPattern.test(value)
					? { ...inputError, emailError: "Invalid email" }
					: { ...inputError, emailError: "" }
			);

			if (!value) {
				setInputError({ ...inputError, emailError: "" });
			}
		}

		// check password
		if (input === "password") {
			// console.log(input, value);
			const specialCharacterPattern = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\|/]/;
			const digitPattern = /\d/;
			const alphabetPattern = /[a-zA-Z]/;

			if (value.length <= 5) {
				setInputError((prevErrors) => ({
					...prevErrors,
					passwordError: "Password length should be greater than 5",
				}));
			} else if (!specialCharacterPattern.test(value)) {
				setInputError((prevErrors) => ({
					...prevErrors,
					passwordError: "Password must contain special characters",
				}));
			} else if (!digitPattern.test(value)) {
				setInputError((prevErrors) => ({
					...prevErrors,
					passwordError: "Password must contain atleast one digit",
				}));
			} else if (!alphabetPattern.test(value)) {
				setInputError((prevErrors) => ({
					...prevErrors,
					passwordError: "Password must contain atleast one alphabet",
				}));
			} else {
				setInputError((prevErrors) => ({
					...prevErrors,
					passwordError: "",
				}));
			}

			if (!value) {
				setInputError({ ...inputError, passwordError: "" });
			}
		}

		// check confirm-password
		if (input === "confirmPassword") {
			setInputError((prevErrors) => ({
				...prevErrors,
				confirmPasswordError:
					formData.password !== value
						? "Password and Confirm-Password must be same"
						: "",
			}));

			if (!value) {
				setInputError((prevErrors) => ({
					...prevErrors,
					confirmPasswordError: "",
				}));
			}
		}
	};

	// function to check validity of password and email
	const isValidCredentials = () => {
		const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

		let isValidEmail = emailPattern.test(formData.email);
		let isValidPassword = isPasswordValid(formData.password);

		if (!isValidEmail) {
			// console.log("Invalid Email");
			showToast("error", "Enter valid Email");
			return;
		}

		if (!isValidPassword) {
			// console.log("Invalid Password");
			showToast("error", "Enter Valid Password");
			return;
		}

		console.log(
			isValidEmail,
			isValidPassword,
			formData["password"] === formData["confirmPassword"]
		);

		return !isLoginForm
			? isValidEmail &&
					isValidPassword &&
					formData["password"] === formData["confirmPassword"]
			: isValidEmail && isValidPassword;
	};

	const handleAuthSubmit = async () => {
		const { fullname, email, password } = formData;

		setLoading(true);

		const response = isLoginForm
			? await userLogInService({
					email: email,
					password: password,
			  })
			: await userSignUpService({
					fullname: fullname,
					email: email,
					password: password,
			  });

		setLoading(false);

		console.log(response);

		if (response.code === 409) {
			showToast("error", "Email Already registed..");
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
			handleAuthSubmit();
		} else {
			console.log("credentials are not proper");
		}
	};

	return (
		<>
			{loading ? (
				<Loader color="#37455f" height="64px" width="64px" />
			) : (
				<div className="auth-container">
					<div className="auth-form-container">
						<h1>
							{isLoginForm ? "Welcome Back!" : "Create Account"}
						</h1>
						<form
							action=""
							className="auth-form"
							onSubmit={handleSubmit}>
							{!isLoginForm && (
								<>
									<label
										htmlFor="fullname"
										className="auth-label">
										Fullname
									</label>
									<input
										type="text"
										id="fullname"
										value={formData["fullname"]}
										onChange={(e) =>
											handleChange(
												"fullname",
												e.target.value
											)
										}
										placeholder="fullname"
										required
									/>
									<div className="error-message">
										{inputError.fullnameError}
									</div>
								</>
							)}
							<label htmlFor="email" className="auth-label">
								Email
							</label>
							<input
								type="email"
								id="email"
								value={formData["email"]}
								onChange={(e) =>
									handleChange("email", e.target.value)
								}
								placeholder="email"
								required
							/>
							<div className="error-message">
								{inputError.emailError}
							</div>
							<label htmlFor="password" className="auth-label">
								Password
							</label>
							<input
								type="password"
								id="password"
								value={formData["password"]}
								onChange={(e) =>
									handleChange("password", e.target.value)
								}
								placeholder="password"
								autoComplete="on"
								required
							/>
							<div className="error-message">
								{inputError.passwordError}
							</div>
							{!isLoginForm && (
								<>
									<label
										htmlFor="confirm-password"
										className="auth-label">
										Confirm Password
									</label>
									<input
										type="password"
										id="confirm-password"
										value={formData["confirmPassword"]}
										onChange={(e) =>
											handleChange(
												"confirmPassword",
												e.target.value
											)
										}
										placeholder="confirm-password"
										autoComplete="on"
										required
									/>
									<div className="error-message">
										{inputError.confirmPasswordError}
									</div>
								</>
							)}
							<button type="submit" className="auth-submit-btn">
								{isLoginForm ? "Log In" : "Sign Up"}
							</button>
						</form>
						<p>
							{isLoginForm ? "Don't" : "Already"} have an account
							?{" "}
							<span onClick={() => setIsLoginForm((p) => !p)}>
								{isLoginForm ? "Register" : "LogIn"}
							</span>
						</p>
					</div>
					{/* <div className="auth-poster">
						<img src={BgGraphics} alt="auth-poster" />
					</div> */}
				</div>
			)}

			<ToastContainer />
		</>
	);
}

export default AuthForm;
