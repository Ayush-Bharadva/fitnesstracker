import { PropTypes } from "prop-types";
// import Modal from "./Modal";
import { CiMail } from "react-icons/ci";

function VerifyEmailModal({ close, onSubmit }) {
	return (
		// <Modal>
		<div className="verify-email-container">
			<button
				className="close-btn"
				onClick={close}>
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
					onClick={onSubmit}>
					Submit
				</button>
			</form>
		</div>
		// </Modal>
	);
}

export default VerifyEmailModal;

VerifyEmailModal.propTypes = {
	close: PropTypes.func,
	onSubmit: PropTypes.func
};
