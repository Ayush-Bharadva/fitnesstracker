import React, { useState } from "react";
import "./AuthForm.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { userLogInService, userSignUpService } from "../../services/services";
import { setCookie, validatePassword } from "../../utils/helper";
import Loader from "../Common/Loader";

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

		// Error checking
		switch (input) {
			case "fullname":
				setInputError((prevErrors) => ({
					...prevErrors,
					fullnameError:
						value.length < 5
							? "Fullname length should be greater than 4"
							: "",
				}));
				break;
			case "email":
				const emailPattern =
					/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
				setInputError((prevErrors) => ({
					...prevErrors,
					emailError: !emailPattern.test(value)
						? "Invalid email"
						: "",
				}));
				break;
			case "password":
				setInputError((prevErrors) => ({
					...prevErrors,
					passwordError: validatePassword(value),
				}));
				break;
			case "confirmPassword":
				setInputError((prevErrors) => ({
					...prevErrors,
					confirmPasswordError:
						formData.password !== value
							? "Password and Confirm-Password must be the same"
							: "",
				}));
				break;
			default:
				break;
		}

		if (!value) {
			setInputError((prevErrors) => ({
				...prevErrors,
				[`${input}Error`]: "",
			}));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { fullname, email, password } = formData;

		if (!isLoginForm && formData.password !== formData.confirmPassword) {
			showToast(
				"error",
				"Password and Confirm-Password must be the same"
			);
			return;
		}

		const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		if (!emailPattern.test(email) || validatePassword(password)) {
			showToast("error", "Enter Valid Credentials");
			return;
		}

		try {
			setLoading(true);

			const response = isLoginForm
				? await userLogInService({ email, password })
				: await userSignUpService({ fullname, email, password });

			setLoading(false);

			if (response.status === 200) {
				setCookie("userId", response.data.userId);
				navigate("/");
			}
			console.log("AUthForm.jsx :", error);
		} catch (error) {
			showToast("AUthForm.jsx error", error.response);
		}

		// if (response.status === 409) {
		// 	showToast("error", "Email Already registed..");
		// } else if (response.status === 401) {
		// 	showToast("error", response.message);
		// } else if (response.status === 200) {
		// 	setCookie("userId", response.data.userId);
		// 	navigate("/");
		// } else if (response.status === 500) {
		// 	showToast("error", response.message);
		// } else if (response.status === 404) {
		// 	showToast("error", response.message);
		// } else {
		// 	showToast("error", "Sign up failed. Please try again.");
		// }
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
				</div>
			)}
			<ToastContainer />
		</>
	);
}

export default AuthForm;
