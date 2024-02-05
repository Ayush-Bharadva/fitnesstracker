import { PropTypes } from "prop-types";
import PasswordInput from "./PasswordInput";

function SetNewPassword({ passwordValue, confirmPasswordValue, passwordError, confirmPasswordError, onPasswordChange, onSetPassword }) {
	return (
		<div className="container">
			<div className="password-updating-container">
				<h2>Set New Password!</h2>
				<form action="">
					<PasswordInput
						htmlFor="new-password"
						label="New Password"
						id="new-password"
						name="password"
						value={passwordValue}
						onChange={onPasswordChange}
						placeholder="new password"
					/>
					{passwordError && <p className="error-message">{passwordError}</p>}

					<PasswordInput
						htmlFor="new-confirm-password"
						label="Confirm New Password"
						id="new-confirm-password"
						name="confirmPassword"
						value={confirmPasswordValue}
						onChange={onPasswordChange}
						placeholder="confirm new password"
					/>
					{confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}

					<button
						type="submit"
						onClick={onSetPassword}>
						Set Password
					</button>
				</form>
			</div>
		</div>
	);
}

export default SetNewPassword;

SetNewPassword.propTypes = {
	passwordValue: PropTypes.string,
	confirmPasswordValue: PropTypes.string,
	passwordError: PropTypes.string,
	confirmPasswordError: PropTypes.string,
	onPasswordChange: PropTypes.func,
	onSetPassword: PropTypes.func
};
