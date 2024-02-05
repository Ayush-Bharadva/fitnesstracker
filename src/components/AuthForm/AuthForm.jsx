import { useMemo, useState } from "react";
import "./AuthForm.scss";
import "react-toastify/dist/ReactToastify.css";
import { Outlet, useNavigate } from "react-router-dom";
import { userLogInService, userSignUpService } from "../../services/services";
import { setCookie, showToast, validatePassword } from "../../utils/helper";
import { emailPattern } from "../../constants/constants";
import Loader from "../Common/Loader";
import PasswordInput from "./PasswordInput";

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
	const [formData, setFormData] = useState(initialFormData);
	const [inputError, setInputError] = useState(initialInputError);

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
	const { fullname, email, password, confirmPassword } = formData;

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

		setInputError((prevErrors) => ({
			...prevErrors,
			...inputErrorObj,
		}));
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleButtonDisable = useMemo(() => {
		if (isLoginForm) {
			return !email || emailError || !password || passwordError;
		} else {
			return (
				!email ||
				emailError ||
				!password ||
				passwordError ||
				!fullname ||
				fullnameError ||
				!confirmPassword ||
				confirmPasswordError
			);
		}
	}, [
		isLoginForm,
		fullname,
		email,
		password,
		confirmPassword,
		fullnameError,
		emailError,
		passwordError,
		confirmPasswordError,
	]);

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
			showToast("error", error);
		}
	};

	const handleFormChange = () => {
		setIsLoginForm((prev) => !prev);
		setFormData(initialFormData);
		setInputError(initialInputError);
	};

	const navToForgotPassWord = () => {
		navigate("forgot-password");
	};

	return (
		<>
			<div className="auth-container">
				<div
					className={`auth-form-container ${
						isLoading ? "m-opacity" : ""
					}`}
				>
					{isLoading && <Loader />}
					<h1>{title}</h1>
					<form className="auth-form">
						{!isLoginForm && (
							<>
								<label
									htmlFor="fullname"
									className="auth-label"
								>
									Fullname
								</label>
								<input
									type="text"
									id="fullname"
									name="fullname"
									value={fullname}
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
							value={email}
							onChange={handleChange}
							placeholder="email"
							required
						/>
						<div className="error-message">{emailError}</div>
						<PasswordInput
							htmlFor="password"
							label="Password"
							id="password"
							name="password"
							value={password}
							onChange={handleChange}
							placeholder="password"
							passwordError={passwordError}
						/>

						{isLoginForm && (
							<p
								className="forgot-password-text"
								onClick={navToForgotPassWord}
							>
								forgot password
							</p>
						)}

						{!isLoginForm && (
							<PasswordInput
								htmlFor="confirm-password"
								label="Confirm Password"
								id="confirm-password"
								name="confirmPassword"
								value={confirmPassword}
								onChange={handleChange}
								placeholder="confirm password"
								passwordError={confirmPasswordError}
							/>
						)}
						<button
							type="submit"
							onClick={handleSubmit}
							className="auth-submit-btn"
							style={{
								cursor: !handleButtonDisable
									? "pointer"
									: "no-drop",
							}}
							disabled={handleButtonDisable}
						>
							{buttonText}
						</button>
					</form>
					<p>
						{linkText}
						<span onClick={handleFormChange}>{linkButtonText}</span>
					</p>
				</div>
			</div>
			<Outlet />
		</>
	);
}

export default AuthForm;
