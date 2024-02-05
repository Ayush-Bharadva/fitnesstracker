import { useEffect, useState } from "react";
import "./ForgotPasswordPage.scss";
import VerifyEmail from "./VerifyEmail";
import VerifyOTP from "./VerifyOTP";
import SetNewPassword from "./SetNewPassword";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import { emailPattern } from "../../constants/constants";
import { showToast, validatePassword } from "../../utils/helper";
import { setNewPassword, verifyEmail, verifyOTP } from "../../services/services";

function ForgotPasswordPage() {
	const navigate = useNavigate();

	const [forgotPasswordState, setForgotPasswordState] = useState({
		isEmailVerified: false,
		isOTPVerified: false,
		isNewPasswordSet: false,
		isVerifying: false,
		verificationToken: ""
	});

	const [formData, setFormData] = useState({
		email: "",
		otp: "",
		password: "",
		confirmPassword: ""
	});

	const [errorState, setErrorState] = useState({
		emailError: "",
		passwordError: "",
		confirmPasswordError: ""
	});

	const [loaderText, setLoaderText] = useState("verifying");

	const { emailError, passwordError, confirmPasswordError } = errorState;

	const validateEmail = email => {
		let error = "";
		if (!email) {
			error = "email is Required";
		} else if (!emailPattern.test(email)) {
			error = "Invalid email";
		}
		console.log("emaiil error :", error);
		return error;
	};

	const validateNewPassword = password => {
		let error = "";
		if (!password) {
			return "password is Required";
		}
		error = validatePassword(password);
		return error;
	};

	const handleInputChange = ({ target: { name, value } }) => {
		const errorObj = {};

		switch (name) {
			case "email":
				errorObj.emailError = validateEmail(value);
				break;

			case "password":
				errorObj.passwordError = validateNewPassword(value);
				break;

			case "confirmPassword":
				errorObj.confirmPasswordError = password !== value ? "password and confirm password must be same" : "";
				break;

			default:
				break;
		}

		setErrorState(prev => ({ ...prev, ...errorObj }));
		setFormData(prevData => ({ ...prevData, [name]: value }));
	};

	const { email, otp, password, confirmPassword } = formData;

	const { isEmailVerified, isOTPVerified, isNewPasswordSet, isVerifying, verificationToken } = forgotPasswordState;
	console.log(isVerifying);

	useEffect(() => {
		if (isNewPasswordSet) {
			showToast("success", "Password Changed Successfully..");
		}
	}, [isNewPasswordSet]);

	const onVerifyEmail = async event => {
		event.preventDefault();

		try {
			setForgotPasswordState(prev => ({ ...prev, isVerifying: true }));
			const { status } = await verifyEmail(email);
			console.log("isEmailFound :", status);

			if (status === 200) {
				setForgotPasswordState(prev => ({
					...prev,
					isEmailVerified: true
				}));
				showToast("success", "An OTP sent successfully to your Email..");
			} else {
				showToast("error", "Could'nt find your email..");
			}
		} catch (error) {
			console.error(error);
		} finally {
			setForgotPasswordState(prev => ({ ...prev, isVerifying: false }));
		}
	};

	const onVerifyOTP = async event => {
		event.preventDefault();

		if (!otp || otp.length < 6) {
			showToast("error", "Please Enter Valid Otp!");
			return;
		}

		try {
			setForgotPasswordState(prev => ({ ...prev, isVerifying: true }));

			const response = await verifyOTP(email, otp);
			console.log(response);

			if (response.status === 200) {
				console.log("here");
				console.log("your token :", response.data.token);
				showToast("success", "OTP verified successfully!");
				setForgotPasswordState(prev => ({
					...prev,
					isOTPVerified: true,
					verificationToken: response.data.token
				}));
			} else if (response.code === 401) {
				showToast("error", "Invalid OTP..");
			}
		} catch (error) {
			console.error(error);
		} finally {
			setForgotPasswordState(prev => ({ ...prev, isVerifying: false }));
		}
	};

	const onResendOtp = async () => {
		try {
			// setLoaderText("sending otp");
			// setForgotPasswordState(prev => ({ ...prev, isVerifying: true }));
			const { status } = await verifyEmail(email);
			console.log("isEmailFound :", status);

			if (status === 200) {
				setForgotPasswordState(prev => ({
					...prev,
					isEmailVerified: true
				}));
				// showToast("success", "An OTP sent successfully to your Email..");
			} else {
				showToast("error", "Could'nt find your email..");
			}
		} catch (error) {
			console.error(error);
		} finally {
			// setForgotPasswordState(prev => ({ ...prev, isVerifying: false }));
		}
	};

	const onNewPasswordSubmit = async event => {
		event.preventDefault();
		try {
			if (password === confirmPassword) {
				setLoaderText("Updating password");
				setForgotPasswordState(prev => ({
					...prev,
					isVerifying: true
				}));
				const { status } = await setNewPassword(email, password, verificationToken);
				if (status === 200) {
					showToast("success", "Password Changed Successfully..");
					navigate("auth");
				}
			} else {
				showToast("error", "Password and Confirm Password doesnt match!!");
			}
		} catch (error) {
			console.error(error);
		} finally {
			setForgotPasswordState(prev => ({ ...prev, isVerifying: false }));
		}
	};

	const loader = (
		<div className="loader-wrapper">
			<h1 className="text">{loaderText}</h1>{" "}
			<ReactLoading
				type="balls"
				color="#fff"
				className="balls-loader"
			/>
		</div>
	);

	return (
		<div id="forgot-password-page-container">
			<VerifyEmail
				emailValue={email}
				onChange={handleInputChange}
				emailError={emailError}
				onEmailSubmit={onVerifyEmail}
			/>
			{isEmailVerified && (
				<VerifyOTP
					otpValue={otp}
					onChangeOtp={handleInputChange}
					onVerify={onVerifyOTP}
					resendOtp={onResendOtp}
				/>
			)}
			{isOTPVerified && (
				<SetNewPassword
					passwordValue={password}
					confirmPasswordValue={confirmPassword}
					passwordError={passwordError}
					confirmPasswordError={confirmPasswordError}
					onPasswordChange={handleInputChange}
					onSetPassword={onNewPasswordSubmit}
				/>
			)}
			{isVerifying && loader}
		</div>
	);
}

export default ForgotPasswordPage;
