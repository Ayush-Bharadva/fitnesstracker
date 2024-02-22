import { PropTypes } from "prop-types";
import { Timer } from "../Common/Timer";
import { useState } from "react";
import { handleKeyDown, showToast } from "../../utils/helper";
import { verifyEmail, verifyOTP } from "../../services/services";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";

function VerifyOTP({ handleNext, data: { email } }) {
	const navigate = useNavigate();

	const [otpState, setOtpState] = useState({
		otp: "",
		otpError: "",
		isVerifying: ""
	});

	const { otp, isVerifying } = otpState;

	const verifyOtpPayload = {
		email,
		otp,
		eventType: "forgot_password"
	};

	const handleOtpChange = ({ target: { value } }) => {
		setOtpState(prev => ({ ...prev, otp: value }));
	};

	const handleOtpVerification = async event => {
		event.preventDefault();

		if (!otp || otp.length < 6) {
			showToast("error", "Please Enter valid OTP!");
			return;
		}

		try {
			setOtpState(prev => ({ ...prev, isVerifying: true }));

			const response = await verifyOTP(verifyOtpPayload);

			if (response.status === 200) {
				handleNext("token", response.data.token);
				showToast("success", "OTP verified successfully!");
			} else if (response.code === 401) {
				showToast("error", "Invalid OTP..");
			}
		} catch (error) {
			throw new Error(error);
		} finally {
			setOtpState(prev => ({ ...prev, isVerifying: false }));
		}
	};

	const onResendOtp = async () => {
		try {
			const { status } = await verifyEmail({ email, eventType: "forgot_password" });
			if (status !== 200) {
				showToast("error", "Could'nt find your email..");
				navigate("/auth");
			}
		} catch (error) {
			throw new Error(error);
		}
	};

	return (
		<>
			{isVerifying && (
				<div className="loader-wrapper">
					<h2 className="text">Verifying OTP</h2>
					<ReactLoading
						type="balls"
						color="#fff"
						className="balls-loader"
					/>
				</div>
			)}
			<div className="container">
				<div className="otp-verification-container">
					<h1 className="otp-verification-heading">Confirm OTP</h1>
					<form>
						<div className="input-group">
							<input
								className="otp-verification-input"
								type="number"
								name="otp"
								value={otp}
								onChange={handleOtpChange}
								onKeyDown={handleKeyDown}
								placeholder="Enter OTP"
							/>
						</div>
						<button
							type="button"
							onClick={handleOtpVerification}>
							Confirm
						</button>
					</form>
					<Timer resendOtp={onResendOtp} />
				</div>
			</div>
		</>
	);
}

export default VerifyOTP;

VerifyOTP.propTypes = {
	handleNext: PropTypes.func,
	data: PropTypes.obj,
};
