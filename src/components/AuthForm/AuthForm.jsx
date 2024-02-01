import { useMemo, useRef, useState } from "react";
import "./AuthForm.scss";
import "react-toastify/dist/ReactToastify.css";
import { Outlet, useNavigate } from "react-router-dom";
import { userLogInService, userSignUpService } from "../../services/services";
import { setCookie, showToast, validatePassword } from "../../utils/helper";
import { emailPattern } from "../../constants/constants";
import Loader from "../Common/Loader";
import PasswordInput from "./PasswordInput";
// import Modal from "./Modal";
// import VerifyEmail from "./VerifyEmail";
// import VerifyOTP from "./VerifyOTP";
// import { CiMail } from "react-icons/ci";
// import VerifyEmail from "./VerifyEmail";
// import Modal from "./Modal";
// import ForgotPasswordPage from "./ForgotPasswordPage";

const initialFormData = {
	fullname: "",
	email: "",
	password: "",
	confirmPassword: ""
};

const initialInputError = {
	fullnameError: "",
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
	const { fullnameError, emailError, passwordError, confirmPasswordError } = inputError;
	const { fullname, email, password, confirmPassword } = formData;

	const handleChange = e => {
		const { name, value } = e.target;

		const inputErrorObj = {};

		switch (name) {
			case "fullname":
				inputErrorObj.fullnameError = value.length < 5 ? "Fullname length should be greater than 4" : "";
				break;
			case "email":
				inputErrorObj.emailError = !emailPattern.test(value) ? "Invalid email" : "";
				break;
			case "password":
				inputErrorObj.passwordError = validatePassword(value);
				break;
			case "confirmPassword":
				inputErrorObj.confirmPasswordError = formData.password !== value ? "Password and Confirm-Password must be same" : "";
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
			return !email || emailError || !password || passwordError || !fullname || fullnameError || !confirmPassword || confirmPasswordError;
		}
	}, [isLoginForm, fullname, email, password, confirmPassword, fullnameError, emailError, passwordError, confirmPasswordError]);

	const handleSubmit = async e => {
		e.preventDefault();

		const { fullname, email, password } = formData;

		try {
			setIsLoading(true);
			const response = isLoginForm ? await userLogInService({ email, password }) : await userSignUpService({ fullname, email, password });
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
		setIsLoginForm(prev => !prev);
		setFormData(initialFormData);
		setInputError(initialInputError);
	};

	// const modalRef = useRef();

	const navToForgotPassWord = () => {
		// if (modalRef.current) {
		// 	modalRef.current.open();
		// }
		navigate("forgot-password");
	};

	//
	// const [showEmailModal, setShowEmailModal] = useState(false);
	// const [showOTPModal, setShowOTPModal] = useState(false);

	// const onSubmitEmail = e => {
	// 	e.preventDefault();
	// 	// setShowEmailModal(false);
	// 	setShowOTPModal(true);
	// };

	// const onVerifyOTP = e => {
	// 	e.preventDefault();
	// 	// setShowEmailModal(false);
	// 	modalRef.current.close();
	// 	return;
	// 	// setShowOTPModal(false);
	// };

	// useEffect(() => {
	// 	if (modalRef.current) {
	// 		console.log("effect : modal current");
	// 		modalRef.current.open();
	// 	}
	// }, [modalRef]);
	//

	// const closeModal = () => {
	// 	if (modalRef.current) {
	// 		modalRef.current.close();
	// 		return;
	// 	}
	// };

	return (
		<>
			<div className="auth-container">
				<div className={`auth-form-container ${isLoading ? "m-opacity" : ""}`}>
					{isLoading && <Loader />}
					<h1>{title}</h1>
					<form className="auth-form">
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
									value={fullname}
									onChange={handleChange}
									placeholder="fullname"
									required
								/>
								<div className="error-message">{fullnameError}</div>
							</>
						)}
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
								onClick={navToForgotPassWord}>
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
								cursor: !handleButtonDisable ? "pointer" : "no-drop"
							}}
							disabled={handleButtonDisable}>
							{buttonText}
						</button>
					</form>
					<p>
						{linkText}
						<span onClick={handleFormChange}>{linkButtonText}</span>
					</p>
				</div>
			</div>
			{/* <Modal ref={modalRef}>
				<div className="verify-email-container">
					<button
						className="close-btn"
						onClick={closeModal}>
						close
					</button>
					<h1>Forgot Password / Verify Email</h1>
					<p>Enter your email to receive an OTP for Verification</p>
					<form action="">
						<div>
							<CiMail className="mail-icon" />
							<input
								type="email"
								placeholder="Enter Email"
							/>
						</div>
						<button
							type="submit"
							onClick={onSubmitEmail}>
							Submit
						</button>
					</form>
				</div>
				{showOTPModal && (
					<VerifyOTP
						close={closeModal}
					/>
				)}
			</Modal> */}
			<Outlet />
			{/* {showForgotPasswordModal && <ForgotPasswordPage />} */}
		</>
	);
}

export default AuthForm;
