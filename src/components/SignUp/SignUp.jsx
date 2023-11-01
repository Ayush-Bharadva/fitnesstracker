import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../UI/Card";
import poster from "../../assets/images/signup_poster.jpg";
import "../styles/General.scss";
import { AuthContext } from "../../contexts/AuthProvider";
import { userSignUpService } from "../../services/services";

function SignUp() {
	const navigate = useNavigate();
	// console.log("navigate :", navigate);

	const [userCredentials, setuserCredentials] = useState({
		fullname: "",
		email: "",
		password: "",
		"confirm-password": "",
	});

	const [error, setError] = useState({
		fullname: "",
		email: "",
		password: "",
		"confirm-password": "",
	});

	const handleInputChange = (input, value) => {
		setuserCredentials((previousCred) => {
			return { ...previousCred, [input]: value };
		});
	};

	// function for password validation
	const isPasswordValid = (password) => {
		if (password.length <= 5) {
			setError((prevError) => ({
				...prevError,
				password: "password lenght should more than 5",
			}));
			return false;
		}

		// special character checking
		const specialCharacterPattern = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\|/]/;
		if (!specialCharacterPattern.test(password)) {
			setError((prevError) => ({
				...prevError,
				password: "password must contain atleast one special character",
			}));
			return false;
		}

		// digit checking checking
		const digitPattern = /\d/;
		if (!digitPattern.test(password)) {
			setError((prevError) => ({
				...prevError,
				password: "password must contain atleast one digit",
			}));
			return false;
		}

		// alphabets checking
		const alphabetPattern = /[a-zA-Z]/;
		if (!alphabetPattern.test(password)) {
			setError((prevError) => ({
				...prevError,
				password: "password must contain alphabets",
			}));
			return false;
		}

		setError((prevError) => ({ ...prevError, password: "" }));
		return true;
	};

	// function to check validity of password and email
	const isValidCredentials = (userCredentials) => {
		const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

		let isValidEmail = emailPattern.test(userCredentials["email"]);
		let isValidPassword = isPasswordValid(userCredentials["password"]);

		if (!isValidPassword) {
			console.log(error);
		}

		return isValidEmail &&
			isValidPassword &&
			userCredentials["password"] === userCredentials["confirm-password"]
			? true
			: false;
	};

	const { signUp } = useContext(AuthContext);

	const handleSignUp = async () => {
		const response = await userSignUpService(userCredentials);
		console.log(response);
		console.log(response.status);
		if (
			response.data === "Successfull loginUser Successfully registered."
		) {
			signUp();
			navigate("/");
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isValidCredentials(userCredentials)) {
			console.log("credentials are proper");
			handleSignUp(userCredentials);
		} else {
			console.log("credentials are not proper");
		}
	};

	return (
		<div className="container">
			<Card>
				<div className="signup-card">
					<h2>Create Account</h2>
					<form
						action=""
						className="signup-form"
						onSubmit={handleSubmit}>
						<input
							type="text"
							id="fullname"
							value={userCredentials["fullname"]}
							onChange={(e) =>
								handleInputChange("fullname", e.target.value)
							}
							placeholder="full name"
							required
						/>
						<input
							type="email"
							id="email"
							value={userCredentials["email"]}
							onChange={(e) =>
								handleInputChange("email", e.target.value)
							}
							placeholder="email"
							required
						/>
						<input
							type="password"
							id="password"
							value={userCredentials["password"]}
							onChange={(e) =>
								handleInputChange("password", e.target.value)
							}
							placeholder="password"
							autoComplete="on"
							required
						/>
						<input
							type="password"
							id="confirm-password"
							value={userCredentials["confirm-password"]}
							onChange={(e) =>
								handleInputChange(
									"confirm-password",
									e.target.value
								)
							}
							placeholder="confirm-password"
							autoComplete="on"
							required
						/>
						<button type="submit" className="btn">
							Sign Up
						</button>
					</form>
					<p>
						Already have an account ?{" "}
						<span onClick={() => navigate("/login")}>Log In</span>
					</p>
				</div>
				<div className="signup-poster">
					<img src={poster} alt="" />
				</div>
			</Card>
		</div>
	);
}

export default SignUp;
