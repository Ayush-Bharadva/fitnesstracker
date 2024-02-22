import { PropTypes } from "prop-types";
import PasswordInput from "./PasswordInput";
import { useState } from "react";
import { showToast, validatePassword } from "../../utils/helper";
import { setNewPassword } from "../../services/services";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import "../../pages/Auth/AuthForm.scss";

function SetNewPassword({ data: { email, token } }) {
	const navigate = useNavigate();

	const [passwordState, setPasswordState] = useState({
		password: "",
		confirmPassword: "",
		isResetting: false
	});

	const [passwordErrorState, setPasswordErrorState] = useState({
		passwordError: "",
		confirmPasswordError: ""
	});

	const { password, confirmPassword, isResetting } = passwordState;
	const { passwordError, confirmPasswordError } = passwordErrorState;

	const resetPasswordPayload = {
		email,
		newPassword: password,
		token,
		eventType: "forgot_password"
	};

	const validateNewPassword = password => {
		let error = "";
		if (!password) {
			return "Password is Required";
		}
		error = validatePassword(password);
		return error;
	};

	const handlePasswordChange = ({ target: { name: key, value } }) => {

		if (key === "password") {
			const error = validateNewPassword(value);
			setPasswordErrorState(prev => ({ ...prev, [`${key}Error`]: error }));
		}

		setPasswordState(prev => ({ ...prev, [key]: value }));
	};

	const handleResetPassword = async () => {

		if (password !== confirmPassword) {
			setPasswordErrorState(prev => ({ ...prev, confirmPasswordError: "Password and confirm Password must match.." }));
			return;
		} else {
			setPasswordErrorState(prev => ({ ...prev, confirmPasswordError: "" }));
		}

		try {
			setPasswordState(prev => ({
				...prev,
				isResetting: true
			}));

			const response = await setNewPassword(resetPasswordPayload);
			if (response.status === 200) {
				showToast("success", "Password Changed Successfully..");
				navigate("/auth");
			}
		} catch (error) {
			throw new Error(error);
		} finally {
			setPasswordState(prev => ({ ...prev, isResetting: false }));
		}
	};

	return (
		<div className="container">
			{isResetting && (
				<div className="loader-wrapper">
					<h1 className="text">Resetting Password</h1>
					<ReactLoading
						type="balls"
						color="#fff"
						className="balls-loader"
					/>
				</div>
			)}
			<div className="password-updating-container">
				<h2>Set New Password!</h2>
				<form>
					<PasswordInput
						label="New Password"
						id="new-password"
						name="password"
						value={password}
						onChange={handlePasswordChange}
						placeholder="new password"
						error={passwordError}
					/>
					<PasswordInput
						label="Confirm New Password"
						id="new-confirm-password"
						name="confirmPassword"
						value={confirmPassword}
						onChange={handlePasswordChange}
						placeholder="confirm new password"
						error={confirmPasswordError}
					/>
					<button
						type="button"
						onClick={handleResetPassword}>
						Set Password
					</button>
				</form>
			</div>
		</div>
	);
}

export default SetNewPassword;

SetNewPassword.propTypes = {
	data: PropTypes.obj
};
