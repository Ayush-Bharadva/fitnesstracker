import { PropTypes } from "prop-types";
import { CiMail } from "react-icons/ci";

function VerifyEmail({ emailValue, onChange, emailError, onEmailSubmit }) {
	return (
		<>
			<div className="container">
				<div className="email-verification-container">
					<h1 className="text-center email-verification-heading">Forgot Password!! </h1>
					<h2 className="text-center"> Verify Your Email</h2>
					<p className="email-verification-subtitle">
						Enter your email and we&apos;ll send you an otp for email verification
					</p>
					<form onSubmit={onEmailSubmit}>
						<div>
							<CiMail className="mail-icon" />
							<input
								id="email-verify"
								type="email"
								name="email"
								value={emailValue}
								title={emailValue}
								onChange={onChange}
								placeholder="Enter Email"
								required
							/>
						</div>
						<p className="email-error-text">{emailError}</p>
						<button>Verify</button>
					</form>
				</div>
			</div>
		</>
	);
}

export default VerifyEmail;

VerifyEmail.propTypes = {
	emailValue: PropTypes.string,
	onChange: PropTypes.func,
	emailError: PropTypes.string,
	onEmailSubmit: PropTypes.func,
};
