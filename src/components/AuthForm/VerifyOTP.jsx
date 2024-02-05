import { PropTypes } from "prop-types";
import { Timer } from "../Common/Timer";

function VerifyOTP({ otpValue, onChangeOtp, onVerify, resendOtp }) {
	return (
		<div className="container">
			<div className="otp-verification-container">
				<h1 className="otp-verification-heading">Confirm OTP</h1>
				<form action="">
					<div>
						<input
							className="otp-verification-input"
							type="number"
							name="otp"
							value={otpValue}
							onChange={onChangeOtp}
							placeholder="Enter OTP"
							maxLength="6"
						/>
					</div>
					<button
						type="submit"
						onClick={onVerify}>
						Confirm
					</button>
				</form>
				<Timer resendOtp={resendOtp} />
			</div>
		</div>
	);
}

export default VerifyOTP;

VerifyOTP.propTypes = {
	otpValue: PropTypes.string,
	onChangeOtp: PropTypes.func,
	onVerify: PropTypes.func,
	resendOtp: PropTypes.func
};
