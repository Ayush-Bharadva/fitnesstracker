import { PropTypes } from "prop-types";
import { useState } from "react";
import { CiMail } from "react-icons/ci";
import { verifyEmail } from "../../services/services";
import { handleKeyDown, showToast } from "../../utils/helper";
import ReactLoading from "react-loading";
import { EmailPattern } from "../../utils/constants";

function VerifyEmail({ handleNext }) {
	const [emailState, setEmailState] = useState({
		email: "",
		emailError: "",
		isVerifying: ""
	});

	const { email, emailError, isVerifying } = emailState;

	const verifyEmailPayload = { email, eventType: "forgot_password" };

	const handleEmailChange = ({ target: { value } }) => {
		let error = !EmailPattern.test(value) ? "invalid Email" : "";
		if (!value) {
			error = "";
		}
		setEmailState(prev => ({ ...prev, email: value, emailError: error }));
	};

	const handleEmailVerification = async () => {

		if (emailError || !email) {
			return;
		}

		try {
			setEmailState(prev => ({ ...prev, isVerifying: true }));
			const { status } = await verifyEmail(verifyEmailPayload);

			if (status === 200) {
				handleNext("email", email);
				showToast("success", "An OTP sent successfully to your Email..");
			} else {
				showToast("error", "Could'nt find your email..");
			}
		} catch (error) {
			console.error(error);
		} finally {
			setEmailState(prev => ({ ...prev, isVerifying: false }));
		}
	};

	return (
		<div className="container">
			{isVerifying && (
				<div className="loader-wrapper">
					<h1 className="text">Verifying Email</h1>{" "}
					<ReactLoading
						type="balls"
						color="#fff"
						className="balls-loader"
					/>
				</div>
			)}
			<div className="email-verification-container">
				<h1 className="text-center email-verification-heading">Forgot Password!! </h1>
				<h3 className="text-center"> Verify Your Email</h3>
				<p className="email-verification-subtitle">
					Enter your email and we&apos;ll send you an otp for Email verification
				</p>
				<form>
					<label
						htmlFor="email"
						className="email-input-label">
						Email
					</label>
					<div className="input-group">
						<CiMail className="mail-icon" />
						<input
							id="email-verify"
							type="email"
							name="email"
							value={email}
							title={email}
							onChange={handleEmailChange}
							onKeyDown={handleKeyDown}
							placeholder="Enter Email"
						/>
					</div>
					<p className="email-error-text">{emailError}</p>
					<button
						type="button"
						onClick={handleEmailVerification}>
						verify
					</button>
				</form>
			</div>
		</div>
	);
}

export default VerifyEmail;

VerifyEmail.propTypes = {
	handleNext: PropTypes.func
};
