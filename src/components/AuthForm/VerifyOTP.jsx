import { PropTypes } from "prop-types";

function VerifyOTP({ otpValue, onChangeOtp, onVerify }) {
	return (
		<div className="verify-otp-container">
			{/* <button className="close-btn">close</button> */}
			<h1>Confirm OTP</h1>
			<p>Enter OTP here!</p>
			<form action="">
				<div>
					<input
						type="number"
						value={otpValue}
						onChange={onChangeOtp}
						placeholder="Enter OTP"
						maxLength="6"
					/>
				</div>
				<button
					type="submit"
					onClick={onVerify}>
					Verify
				</button>
			</form>
		</div>
	);
}

export default VerifyOTP;

VerifyOTP.propTypes = {
	otpValue: PropTypes.string,
	onChangeOtp: PropTypes.func,
	onVerify: PropTypes.func
};
