import React, { useMemo, useState } from "react";
import "./AuthForm.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { userLogInService, userSignUpService } from "../../services/services";
import { setCookie, showToast, validatePassword } from "../../utils/helper";
import { emailPattern } from "../../constants/constants";
import { IoEyeOutline } from "react-icons/io5";
import { LuEyeOff } from "react-icons/lu";
import Loader from "../Common/Loader";

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

function AuthForm() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [isLoginForm, setIsLoginForm] = useState(true);
	const [show, setShow] = useState({
		showPassword: false,
		showConfirmPassword: false,
	});
	const [formData, setFormData] = useState(initialFormData);
	const [inputError, setInputError] = useState(initialInputError);
	const [isButtonDisable, setIsButtonDisable] = useState(true);

	const formObject = useMemo(() => {
		return isLoginForm
			? {
					title: "Welcome Back!",
					buttonText: "Log In",
					linkText: "Don't have an account? ",
					linkButtonText: "Register",
			  }
			: {
					title: "Create Account",
					buttonText: "Sign Up",
					linkText: "Already have an account? ",
					linkButtonText: "Log In",
			  };
	}, [isLoginForm]);

	const { title, buttonText, linkText, linkButtonText } = formObject;
	const { fullnameError, emailError, passwordError, confirmPasswordError } =
		inputError;

	const handleChange = (e) => {
		const { name, value } = e.target;

		const inputErrorObj = {};

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
						? "Password and Confirm-Password must be same"
						: "";
				break;
			default:
				break;
		}

		if (!value) {
			inputErrorObj[`${name}Error`] = `${name} is required`;
		}

		const {
			fullnameError = "",
			emailError = "",
			passwordError = "",
			confirmPasswordError = "",
		} = inputErrorObj || {};

		setInputError((prevErrors) => ({
			...prevErrors,
			...inputErrorObj,
		}));

		setIsButtonDisable(() => {
			if (isLoginForm && !emailError.length && !passwordError.length) {
				return false;
			} else if (
				!isLoginForm &&
				!fullnameError.length &&
				!emailError.length &&
				!passwordError.length &&
				!confirmPasswordError.length
			) {
				return false;
			} else {
				return true;
			}
		});
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { fullname, email, password } = formData;

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
		setInputError(initialInputError);
	};

	const handleShowPassword = (type) => {
		setShow((prev) => ({ ...prev, [type]: !prev[type] }));
	};

	const { showPassword, showConfirmPassword } = show;

	return (
		<>
			<div className="auth-container">
				<div
					className={`auth-form-container ${
						isLoading ? "m-opacity" : ""
					}`}>
					{isLoading && <Loader />}
					<h1>{title}</h1>
					<form className="auth-form" onSubmit={handleSubmit}>
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

								<div className="error-message">
									{fullnameError}
								</div>
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
						<div className="error-message">{emailError}</div>
						<label htmlFor="password" className="auth-label">
							Password
						</label>
						<div className="pass-field">
							<input
								type={showPassword ? "text" : "password"}
								id="password"
								name="password"
								value={formData["password"]}
								onChange={handleChange}
								placeholder="password"
								autoComplete="on"
								required
							/>
							{showPassword ? (
								<IoEyeOutline
									onClick={() =>
										handleShowPassword("showPassword")
									}
								/>
							) : (
								<LuEyeOff
									onClick={() =>
										handleShowPassword("showPassword")
									}
								/>
							)}
						</div>
						<div className="error-message">{passwordError}</div>
						{!isLoginForm && (
							<>
								<label
									htmlFor="confirm-password"
									className="auth-label">
									Confirm Password
								</label>
								<div className="conf-pass-field">
									<input
										type={
											showConfirmPassword
												? "text"
												: "password"
										}
										id="confirm-password"
										name="confirmPassword"
										value={formData["confirmPassword"]}
										onChange={handleChange}
										placeholder="confirm-password"
										autoComplete="on"
										required
									/>
									{showConfirmPassword ? (
										<IoEyeOutline
											onClick={() =>
												handleShowPassword(
													"showConfirmPassword"
												)
											}
										/>
									) : (
										<LuEyeOff
											onClick={() =>
												handleShowPassword(
													"showConfirmPassword"
												)
											}
										/>
									)}
								</div>
								<div className="error-message">
									{confirmPasswordError}
								</div>
							</>
						)}
						<button
							type="submit"
							className="auth-submit-btn"
							style={{
								cursor: isButtonDisable ? "no-drop" : "pointer",
							}}
							disabled={isButtonDisable}>
							{buttonText}
						</button>
					</form>
					<p>
						{linkText}
						<span onClick={handleFormChange}>{linkButtonText}</span>
					</p>
				</div>
			</div>
			<ToastContainer />
		</>
	);
}

export default AuthForm;
