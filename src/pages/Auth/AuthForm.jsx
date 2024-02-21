import { useMemo, useState } from "react";
import "./AuthForm.scss";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { userLogIn, userSignUp } from "../../services/services";
import { setCookie, showToast, validatePassword } from "../../utils/helper";
import { EmailPattern } from "../../utils/constants";
import Loader from "../../components/Common/Loader/Loader";
import PasswordInput from "../../components/Auth/PasswordInput";

const initialFormData = {
	fullName: "",
	email: "",
	password: "",
	confirmPassword: ""
};

const initialInputError = {
	fullNameError: "",
	emailError: "",
	passwordError: "",
	confirmPasswordError: ""
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
				linkButtonText: "Register"
			}
			: {
				title: "Create Account",
				buttonText: "Sign Up",
				linkText: "Already have an account? ",
				linkButtonText: "Log In"
			};
	}, [isLoginForm]);

	const { title, buttonText, linkText, linkButtonText } = formObject;
	const { fullNameError, emailError, passwordError, confirmPasswordError } = inputError;
	const { fullName, email, password, confirmPassword } = formData;

	const handleChange = e => {
		const { name, value } = e.target;

		const inputErrorObj = {};

		switch (name) {
			case "fullName":
				inputErrorObj.fullNameError =
					value.length < 5 ? "fullName length should be greater than 4 characters" : "";
				break;
			case "email":
				inputErrorObj.emailError = !EmailPattern.test(value) ? "Invalid email" : "";
				break;
			case "password":
				inputErrorObj.passwordError = validatePassword(value);
				break;
			case "confirmPassword":
				inputErrorObj.confirmPasswordError =
					formData.password !== value ? "Password and Confirm-Password must be same" : "";
				break;
			default:
				break;
		}

		if (!value) {
			inputErrorObj[`${name}Error`] = `${name} is required`;
		}

		setInputError(prevErrors => ({
			...prevErrors,
			...inputErrorObj
		}));
		setFormData(prevData => ({ ...prevData, [name]: value }));
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
				!fullName ||
				fullNameError ||
				!confirmPassword ||
				confirmPasswordError
			);
		}
	}, [
		isLoginForm,
		fullName,
		email,
		password,
		confirmPassword,
		fullNameError,
		emailError,
		passwordError,
		confirmPasswordError
	]);

	const handleAuthUser = async () => {
		const { fullName, email, password } = formData;

		try {
			setIsLoading(true);
			const response = isLoginForm
				? await userLogIn({ email, password })
				: await userSignUp({ fullName, email, password });
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
		setIsLoginForm(prev => !prev);
		setFormData(initialFormData);
		setInputError(initialInputError);
	};

	const navToForgotPassWord = () => {
		navigate("forgot-password");
	};

	console.log('passwordError', passwordError);

	return (
		<>
			<div className="auth-container">
				<div className={`auth-form-container ${isLoading ? "m-opacity" : ""}`}>
					{isLoading && <Loader />}
					<div className="auth-form-wrapper">
						<h1>{title}</h1>
						<form className="auth-form">
							{!isLoginForm && (
								<div className="input-wrapper">
									<label
										htmlFor="fullName"
										className="auth-label">
										FullName
									</label>
									<input
										type="text"
										id="fullName"
										name="fullName"
										value={fullName}
										onChange={handleChange}
										placeholder="FullName"
										required
									/>
									<p className="error-message">{fullNameError}</p>
								</div>
							)}

							<div className="input-wrapper">
								<label
									htmlFor="email"
									className="auth-label">
									Email
								</label>
								<input
									type="email"
									id="email"
									name="email"
									value={email}
									onChange={handleChange}
									placeholder="Email"
									required
								/>
								<p className="error-message">{emailError}</p>
							</div>

							<PasswordInput
								label="Password"
								id="password"
								name="password"
								value={password}
								onChange={handleChange}
								placeholder="Password"
								error={passwordError}
							/>

							{!isLoginForm && (
								<PasswordInput
									label="Confirm Password"
									id="confirm-password"
									name="confirmPassword"
									value={confirmPassword}
									onChange={handleChange}
									placeholder="Confirm Password"
									error={confirmPasswordError}
								/>
							)}

							{isLoginForm && (
								<p
									className="forgot-password-text"
									onClick={navToForgotPassWord}>
									forgot password
								</p>
							)}
							<button
								type="button"
								className="auth-submit-btn"
								onClick={handleAuthUser}
								style={{
									cursor: !handleButtonDisable ? "pointer" : "no-drop"
								}}
								disabled={handleButtonDisable}>
								{buttonText}
							</button>
						</form>
						<p className="auth-form-text" >
							{linkText}
							<span onClick={handleFormChange}>{linkButtonText}</span>
						</p>
					</div>
				</div>
			</div>
		</>
	);
}

export default AuthForm;
