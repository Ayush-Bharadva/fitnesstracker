import { PropTypes } from "prop-types";
import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { LuEyeOff } from "react-icons/lu";

function PasswordInput({ htmlFor, label, id, name, value, onChange, placeholder, passwordError, confirmPasswordError }) {
	const [showPassword, setShowPassword] = useState(false);
	return (
		<>
			<label
				htmlFor={htmlFor}
				className="auth-label">
				{label}
			</label>
			<div className="pass-field">
				<input
					type={showPassword ? "text" : "password"}
					id={id}
					name={name}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					autoComplete="on"
					required
				/>
				{showPassword ? <IoEyeOutline onClick={() => setShowPassword(prevState => !prevState)} /> : <LuEyeOff onClick={() => setShowPassword(prevState => !prevState)} />}
			</div>
			{passwordError && <div className="error-message">{passwordError}</div>}
			{confirmPasswordError && <div className="error-message">{confirmPasswordError}</div>}
		</>
	);
}

export default PasswordInput;

PasswordInput.propTypes = {
	label: PropTypes.string,
	htmlFor: PropTypes.string,
	type: PropTypes.string,
	id: PropTypes.string,
	name: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
	placeholder: PropTypes.string,
	autoComplete: PropTypes.string,
	passwordError: PropTypes.string,
	confirmPasswordError: PropTypes.string
};
