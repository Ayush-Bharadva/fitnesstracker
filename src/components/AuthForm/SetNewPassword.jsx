import { PropTypes } from "prop-types";
import PasswordInput from "./PasswordInput";

function SetNewPassword({ passwordValue, confirmPasswordValue, onPasswordChange, onSetPassword }) {
	return (
		<div className="set-new-password-container">
			<h2>Set New Password!</h2>

			<form action="">
				<div className="form-group">
					{/* <label htmlFor="new-password">New Password</label>
					<input
						id="new-password"
						type="password"
						placeholder="new password"
					/> */}
					<PasswordInput
						htmlFor="new-password"
						label="New Password"
						id="new-password"
						name="newPassword"
						value={passwordValue}
						onChange={onPasswordChange}
						placeholder="new password"
						passwordError=""
						confirmPasswordError=""
					/>
				</div>
				<div className="form-group">
					{/* <label htmlFor="new-confirm-password">Confirm New Password</label>
					<input
						id="new-confirm-password"
						type="password"
						placeholder="confirm new password"
					/> */}
					<PasswordInput
						htmlFor="new-confirm-password"
						label="Confirm New Password"
						id="new-confirm-password"
						name="newConfirmPassword"
						value={confirmPasswordValue}
						onChange={onPasswordChange}
						placeholder="confirm new password"
						passwordError=""
						confirmPasswordError=""
					/>
				</div>
				<button
					type="submit"
					onClick={onSetPassword}>
					Set Password
				</button>
			</form>
		</div>
	);
}

export default SetNewPassword;

SetNewPassword.propTypes = {
	passwordValue: PropTypes.string,
	confirmPasswordValue: PropTypes.string,
	onPasswordChange: PropTypes.func,
	onSetPassword: PropTypes.func
};
