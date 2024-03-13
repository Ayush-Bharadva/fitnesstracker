import { PropTypes } from "prop-types";
import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { LuEyeOff } from "react-icons/lu";

function PasswordInput({ label, id, name, value, onChange, placeholder, error }) {
	const [showPassword, setShowPassword] = useState(false);
	return (
		<div className="input-wrapper">
			<label htmlFor={id} className="auth-label">
				{label}
			</label>
			<div className="pass-field-group">
				<input
					type={showPassword ? "text" : "password"}
					id={id}
					name={name}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					autoComplete="on"
				/>
				{showPassword ? (
					<IoEyeOutline className="eye-icon" onClick={() => setShowPassword((prevState) => !prevState)} />
				) : (
					<LuEyeOff className="eye-icon" onClick={() => setShowPassword((prevState) => !prevState)} />
				)}
			</div>
			<p className="error-message"> {error} </p>
		</div>
	);
}

export default PasswordInput;

PasswordInput.propTypes = {
	label: PropTypes.string,
	id: PropTypes.string,
	name: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
	placeholder: PropTypes.string,
	error: PropTypes.string
};