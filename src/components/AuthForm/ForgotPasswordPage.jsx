import { useEffect, useState } from "react";
import "./Modal.scss";
import "./ForgotPasswordPage.scss";
import VerifyEmail from "./VerifyEmail";
import VerifyOTP from "./VerifyOTP";
import { emailPattern } from "../../constants/constants";
import { showToast } from "../../utils/helper";
import SetNewPassword from "./SetNewPassword";
import { setNewPassword, verifyEmail, verifyOTP } from "../../services/services";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";

function ForgotPasswordPage() {
	// handle forgot password here

	const navigate = useNavigate();

	const [forgotPasswordState, setForgotPasswordState] = useState({
		isEmailVerified: false,
		isOTPVerified: false,
		isNewPasswordSet: false,
		isVerifying: false,
		verificationToken: ""
	});
	const [emailState, setEmailState] = useState({
		emailValue: "",
		emailError: "",
		isEmailExists: true
	});
	const [otpState, setOtpState] = useState({
		otpValue: "",
		otpError: "",
		isValidOtp: false
	});
	const [passwordState, setPasswordState] = useState({
		newPassword: "",
		newConfirmPassword: ""
	});

	const { isEmailVerified, isOTPVerified, isNewPasswordSet, isVerifying, verificationToken } = forgotPasswordState;
	console.log(isVerifying);
	const { emailValue, emailError } = emailState;
	const { otpValue } = otpState;
	const { newPassword, newConfirmPassword } = passwordState;
	console.log("verificationToken :", verificationToken);

	useEffect(() => {
		if (isNewPasswordSet) {
			showToast("success", "Password Changed Successfully..");
		}
	}, [isNewPasswordSet]);

	const onEmailChange = ({ target: { value } }) => {
		let emailError = !emailPattern.test(value) ? "Invalid email" : "";

		if (!value) {
			emailError = "email is required!";
		}
		setEmailState(prev => ({ ...prev, emailValue: value, emailError }));
	};

	const onEmailSubmit = async e => {
		// some process, check via api email exists in db or not
		e.preventDefault();
		if (emailValue.trim().length && emailPattern.test(emailValue)) {
			try {
				setForgotPasswordState(prev => ({ ...prev, isVerifying: true }));
				const isEmailFound = await verifyEmail(emailValue);
				console.log("isEmailFound :", isEmailFound, isEmailFound.status);

				if (isEmailFound.status === 200) {
					setForgotPasswordState(prev => ({ ...prev, isEmailVerified: true }));
					showToast("success", "An OTP sent successfully to your Email..");
				} else {
					showToast("error", "Please provide valid email..");
				}
			} catch (error) {
				console.error(error);
			} finally {
				setForgotPasswordState(prev => ({ ...prev, isVerifying: false }));
			}
		}
	};

	const onOtpChange = ({ target: { value } }) => {
		setOtpState(prev => ({ ...prev, otpValue: value }));
	};

	const onVerifyOTP = async e => {
		e.preventDefault();

		try {
			setForgotPasswordState(prev => ({ ...prev, isVerifying: true }));

			const {
				status,
				data: { token }
			} = await verifyOTP(emailValue, otpValue);

			if (status === 200) {
				console.log("your token :", token);
				showToast("success", "OTP verified successfully!");
				setForgotPasswordState(prev => ({ ...prev, isOTPVerified: true, verificationToken: token }));
			} else {
				showToast("error", "Invalid OTP..");
			}
		} catch (error) {
			console.error(error);
		} finally {
			setForgotPasswordState(prev => ({ ...prev, isVerifying: false }));
		}
	};

	const onPasswordChange = ({ target: { name, value } }) => {
		setPasswordState(prev => ({ ...prev, [name]: value }));
	};

	const onSetNewPasswordSubmit = async event => {
		event.preventDefault();
		try {
			if (newPassword === newConfirmPassword) {
				const response = await setNewPassword(emailValue, newPassword, verificationToken);
				// console.log(response);
				if (response.status === 200) {
					showToast("success", "Password Changed Successfully..");
					navigate("../");
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
			<h1 className="text">Verifying</h1>{" "}
			<ReactLoading
				type="balls"
				color="#fff"
				className="balls-loader"
			/>
		</div>
	);

	return (
		<div className="forgot-password-page-container">
			<VerifyEmail
				emailValue={emailValue}
				onChange={onEmailChange}
				emailError={emailError}
				onEmailSubmit={onEmailSubmit}
			/>
			{isEmailVerified && (
				<VerifyOTP
					otpValue={otpValue}
					onChangeOtp={onOtpChange}
					onVerify={onVerifyOTP}
				/>
			)}
			{isOTPVerified && (
				<SetNewPassword
					passwordValue={newPassword}
					confirmPasswordValue={newConfirmPassword}
					onPasswordChange={onPasswordChange}
					onSetPassword={onSetNewPasswordSubmit}
				/>
			)}
			{isVerifying && loader}
			{isEmailVerified && isOTPVerified && isVerifying && (
				<div className="loader-wrapper">
					<h1 className="text">Updating Password</h1>{" "}
					<ReactLoading
						type="balls"
						color="#fff"
						className="balls-loader"
					/>
				</div>
			)}
		</div>
		// {/* <Modal ref={modalRef}>
		// 	{showEmailModal && (
		// 		<VerifyEmail
		// 			close={() => setShowEmailModal(false)}
		// 			onSubmit={onSubmitEmail}
		// 		/>
		// 	)}
		// 	{showOTPModal && (
		// 		<VerifyOTP
		// 			close={() => setShowOTPModal(false)}
		// 			onVerifyOTP={onVerifyOTP}
		// 		/>
		// 	)}
		// </Modal> */}
	);
}

export default ForgotPasswordPage;
