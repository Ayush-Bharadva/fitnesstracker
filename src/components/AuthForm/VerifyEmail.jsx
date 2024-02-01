import { PropTypes } from "prop-types";
// import { useState } from "react";
// import Modal from "./Modal";
import { CiMail } from "react-icons/ci";
// import { showToast } from "../../utils/helper";
// import { emailPattern } from "../../constants/constants";

function VerifyEmail({ emailValue, onChange, emailError, onEmailSubmit }) {
	return (
		// <Modal>
		<div className="verify-email-container">
			{/* <button className="close-btn">close</button> */}
			<h1>Forgot Password !! </h1>
			<h1> Verify Your Email</h1>
			<p>Enter your email to receive an OTP for Verification</p>
			<form
				action=""
				onSubmit={onEmailSubmit}>
				<div>
					<CiMail className="mail-icon" />
					<input
						id="email-verify"
						name="email"
						type="email"
						value={emailValue}
						onChange={onChange}
						placeholder="Enter Email"
					/>
				</div>
				<p className="email-error-text">{emailError}</p>
				<button type="submit">Submit</button>
			</form>
		</div>
		// </Modal>
	);
}

export default VerifyEmail;

VerifyEmail.propTypes = {
	emailValue: PropTypes.string,
	onChange: PropTypes.func,
	emailError: PropTypes.string,
	onEmailSubmit: PropTypes.func
	// close: PropTypes.func,
	// onSubmit: PropTypes.func
};
