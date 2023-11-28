import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import poster from "../../assets/images/signup_poster.jpg";
import { userSignUpService } from "../../services/services";
import { isPasswordValid, setCookie } from "../../utils/helper";
import "./SignUp.scss";
import Loader from "../Common/Loader";

function SignUp() {
	// console.log(isLoginForm);
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const [formData, setFormData] = useState({
		fullname: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [inputError, setInputError] = useState({
		fullnameError: "",
		emailError: "",
		passwordError: "",
		confirmPasswordError: "",
	});

	const showToast = (type, message = "temp") => {
		toast[type](message, { position: toast.POSITION.TOP_RIGHT });
	};

	const handleChange = (input, value) => {
		setFormData((prevData) => ({ ...prevData, [input]: value }));

		// Error checking

		// check fullname
		if (input === "fullname") {
			setInputError((prevErrors) => ({
				...prevErrors,
				fullnameError:
					value.length < 5
						? "Fullname length should be greater than 4"
						: "",
			}));
		}

		// check email
		if (input === "email") {
			// console.log("email check");
			const emailPattern =
				/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

			setInputError(
				!emailPattern.test(value)
					? { ...inputError, emailError: "Invalid email" }
					: { ...inputError, emailError: "" }
			);

			if (!value) {
				setInputError({ ...inputError, emailError: "" });
			}
		}

		// check password
		if (input === "password") {
			// console.log(input, value);
			const specialCharacterPattern = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\|/]/;
			const digitPattern = /\d/;
			const alphabetPattern = /[a-zA-Z]/;

			if (value.length <= 5) {
				setInputError((prev) => ({
					...prev,
					passwordError: "Password length should be > 5",
				}));
			} else if (!specialCharacterPattern.test(value)) {
				setInputError((prev) => ({
					...prev,
					passwordError: "Password must contain special characters",
				}));
			} else if (!digitPattern.test(value)) {
				setInputError((prev) => ({
					...prev,
					passwordError: "Password must contain atleast one digit",
				}));
			} else if (!alphabetPattern.test(value)) {
				setInputError((prev) => ({
					...prev,
					passwordError: "Password must contain atleast one alphabet",
				}));
			} else {
				setInputError((prev) => ({
					...prev,
					passwordError: "",
				}));
			}

			if (!value) {
				setInputError({ ...inputError, passwordError: "" });
			}
		}

		// check confirm-password
		if (input === "confirmPassword") {
			setInputError((prevErrors) => ({
				...prevErrors,
				confirmPasswordError:
					formData.password !== formData.confirmPassword
						? "Password and Confirm-Password must be same"
						: "",
			}));
		}
	};

	// function to check validity of password and email
	const isValidCredentials = () => {
		const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

		let isValidEmail = emailPattern.test(formData.email);
		let isValidPassword = isPasswordValid(formData.password);

		if (!isValidEmail) {
			// console.log("Invalid Email");
			showToast("error", "Enter valid Email");
			return;
		}

		if (!isValidPassword) {
			// console.log("Invalid Password");
			showToast("error", "Enter Valid Password");
			return;
		}

		console.log(
			isValidEmail,
			isValidPassword,
			formData["password"] === formData["confirmPassword"]
		);

		return (
			isValidEmail &&
			isValidPassword &&
			formData["password"] === formData["confirmPassword"]
		);
	};

	const handleSignUp = async () => {
		const { fullname, email, password } = formData;

		setLoading(true);

		const response = await userSignUpService({
			fullname: fullname,
			email: email,
			password: password,
		});

		setLoading(false);

		console.log(response);

		if (response.code === 409) {
			setFormData((prevError) => ({
				...prevError,
				errors: {
					...prevError.errors,
					email: "Email registed already..",
				},
			}));
			showToast("error", "Email already registed..");
		} else if (response.status === 200) {
			setCookie("userId", response.data.userId);
			navigate("/");
		} else {
			showToast("error", "Sign up failed. Please try again.");
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isValidCredentials()) {
			handleSignUp();
		} else {
			console.log("credentials are not proper");
		}
	};

	return (
		<>
			{loading ? (
				<Loader color="#37455f" height="64px" width="64px" />
			) : (
				<div className="signup-container">
					<div className="signup-form-container">
						<h2>Create Account</h2>
						<form
							action=""
							className="signup-form"
							onSubmit={handleSubmit}>
							<input
								type="text"
								id="fullname"
								value={formData["fullname"]}
								onChange={(e) =>
									handleChange("fullname", e.target.value)
								}
								placeholder="fullname"
								required
							/>
							<input
								type="email"
								id="email"
								value={formData["email"]}
								onChange={(e) =>
									handleChange("email", e.target.value)
								}
								placeholder="email"
								required
							/>
							<div className="error-message">
								{inputError.emailError}
							</div>

							<input
								type="password"
								id="password"
								value={formData["password"]}
								onChange={(e) =>
									handleChange("password", e.target.value)
								}
								placeholder="password"
								autoComplete="on"
								required
							/>
							<div className="error-message">
								{inputError.passwordError}
							</div>
							<input
								type="password"
								id="confirm-password"
								value={formData["confirmPassword"]}
								onChange={(e) =>
									handleChange(
										"confirmPassword",
										e.target.value
									)
								}
								placeholder="confirm-password"
								autoComplete="on"
								required
							/>
							<div className="error-message">
								{inputError.confirmPasswordError}
							</div>
							<button type="submit" className="signup-btn">
								Sign Up
							</button>
						</form>
						<p>
							Already have an account ?{" "}
							<span onClick={() => navigate("/login")}>
								Log In
							</span>
						</p>
					</div>
					<div className="signup-poster">
						<img src={poster} alt="signup-poster" />
					</div>
				</div>
			)}

			<ToastContainer />
		</>
	);
}

export default SignUp;
