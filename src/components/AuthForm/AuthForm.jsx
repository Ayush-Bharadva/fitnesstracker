import React, { useState } from "react";
import "./AuthForm.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { userLogInService, userSignUpService } from "../../services/services";
import { setCookie, showToast, validatePassword } from "../../utils/helper";
import Loader from "../Common/Loader";
import { emailPattern } from "../../constants/constants";

const initialFormData = {
	fullname: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const initialInputError = {
	fullnameError: "",
	emailError: "",
	passwordError: "",
	confirmPasswordError: "",
};

const inputErrorObj = {
	fullnameError: "",
	emailError: "",
	passwordError: "",
	confirmPasswordError: "",
};

function AuthForm() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [isLoginForm, setIsLoginForm] = useState(true);
	const [formData, setFormData] = useState(initialFormData);
	const [inputError, setInputError] = useState(initialInputError);

	const handleChange = (e) => {
		const { name, value } = e.target;

		switch (name) {
			case "fullname":
				inputErrorObj.fullnameError =
					value.length < 5
						? "Fullname length should be greater than 4"
						: "";
				break;
			case "email":
				inputErrorObj.emailError = !emailPattern.test(value)
					? "Invalid email"
					: "";
				break;
			case "password":
				inputErrorObj.passwordError = validatePassword(value);
				break;
			case "confirmPassword":
				inputErrorObj.confirmPasswordError =
					formData.password !== value
						? "Password and Confirm-Password must be the same"
						: "";
				break;
			default:
				break;
		}

		if (!value) {
			inputErrorObj[`${name}Error`] = `${name} is required`;
		}

		setInputError((prevErrors) => ({
			...prevErrors,
			...inputErrorObj,
		}));

		setFormData((prevData) => ({ ...prevData, [name]: value }));
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

		if (!emailPattern.test(email) || validatePassword(password)) {
			showToast("error", "Enter Valid Credentials");
			return;
		}

		try {
			setIsLoading(true);
			const response = isLoginForm
				? await userLogInService({ email, password })
				: await userSignUpService({ fullname, email, password });
			setIsLoading(false);

			if (response.status === 200) {
				setCookie("userId", response.data.userId);
				navigate("/");
			}
		} catch (error) {
			showToast("error", error.response.data.message);
		}
	};

	const handleFormChange = () => {
		setIsLoginForm((prev) => !prev);
		setFormData(initialFormData);
		// setInputError(initialInputError);
	};

	return (
		<>
			<div className="auth-container">
				{isLoading ? (
					<Loader />
				) : (
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
										name="fullname"
										value={formData["fullname"]}
										onChange={handleChange}
										placeholder="fullname"
										required
									/>
									{inputError.fullnameError && (
										<div className="error-message">
											{inputError.fullnameError}
										</div>
									)}
								</>
							)}
							<label htmlFor="email" className="auth-label">
								Email
							</label>
							<input
								type="email"
								id="email"
								name="email"
								value={formData["email"]}
								onChange={handleChange}
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
								name="password"
								value={formData["password"]}
								onChange={handleChange}
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
										name="confirmPassword"
										value={formData["confirmPassword"]}
										onChange={handleChange}
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
							?
							<span onClick={handleFormChange}>
								{isLoginForm ? "Register" : "LogIn"}
							</span>
						</p>
					</div>
				)}
			</div>
			<ToastContainer />
		</>
	);
}

export default AuthForm;
