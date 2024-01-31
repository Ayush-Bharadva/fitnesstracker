import { PropTypes } from "prop-types";

function VerifyOTPModal({ close }) {
	return (
		<div className="verify-otp-container">
			<button
				className="close-btn"
				onClick={close}>
				close
			</button>
			<h1>Confirm OTP</h1>
			<p>Enter OTP here!</p>
			<form action="">
				<div>
					<input
						type="number"
						placeholder="Enter OTP"
					/>
				</div>
				<button type="submit">Verify</button>
			</form>
		</div>
	);
}

export default VerifyOTPModal;

VerifyOTPModal.propTypes = {
	close: PropTypes.func
};
