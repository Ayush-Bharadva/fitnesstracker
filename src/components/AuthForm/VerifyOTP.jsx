import { PropTypes } from "prop-types";
import { Timer } from "../Common/Timer";

function VerifyOTP({ onVerify, otpValue, onChange, resendOtp }) {
	return (
		<div className="container">
			<div className="otp-verification-container">
				<h1 className="otp-verification-heading">Confirm OTP</h1>
				<form onSubmit={onVerify}>
					<div>
						<input
							className="otp-verification-input"
							type="number"
							name="otp"
							value={otpValue}
							onChange={onChange}
							placeholder="Enter OTP"
							maxLength="6"
							minLength="6"
						/>
					</div>
					<button>Confirm</button>
				</form>
				<Timer resendOtp={resendOtp} />
			</div>
		</div>
	);
}

export default VerifyOTP;

VerifyOTP.propTypes = {
	onVerify: PropTypes.func,
	otpValue: PropTypes.string,
	onChange: PropTypes.func,
	resendOtp: PropTypes.func,
};
