import React, { useState } from "react";
// import Card from "../Common/Card";
// import "../styles/General.scss";
import poster from "../../assets/images/signup_poster.jpg";
import { useNavigate } from "react-router-dom";
import { userLogInService } from "../../services/services";
import { setCookie } from "../../utils/helper";
// import "./Login.scss";

function Login() {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [inputError, setInputError] = useState({
		fullnameError: "",
		emailError: "",
		passwordError: "",
		confirmPasswordError: "",
	});

	const handleInputChange = (input, value) => {
		setFormData((prevInput) => {
			return { ...prevInput, [input]: value };
		});
	};

	const handleLoginSubmit = async (e) => {
		e.preventDefault();

		const response = await userLogInService(formData);
		console.log(response.status);
		console.log(response);
		if (response.status === 200) {
			setCookie("userId", response.data.userId);
			// navigate("/");
			navigate("/daily-goals");
		}
	};

	return (
		<div className="login-container">
			<div className="login-form-container">
				<h2>Welcome Back!</h2>
				<form
					action=""
					className="login-form"
					onSubmit={handleLoginSubmit}>
					<input
						type="email"
						id="email"
						value={formData["email"]}
						onChange={(e) =>
							handleInputChange("email", e.target.value)
						}
						placeholder="email"
					/>
					<input
						type="password"
						id="password"
						value={formData["password"]}
						onChange={(e) =>
							handleInputChange("password", e.target.value)
						}
						placeholder="password"
						autoComplete="on"
					/>
					<button type="submit" className="login-btn">
						LogIn
					</button>
				</form>
				<p>
					Don't have an account ?{" "}
					<span onClick={() => navigate("/signup")}>Register</span>
				</p>
			</div>
			<div className="login-poster">
				<img src={poster} alt="login-poster" />
			</div>
		</div>
	);
}

export default Login;
