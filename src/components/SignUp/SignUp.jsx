import React, { useState } from "react";
import Card from "../UI/Card";
import Main from "../UI/Main";
import poster from "../../refrences/signup_poster.jpg";
import "../styles/General.scss";

function InputError() {
	return <></>;
}

function SignUp() {
	const [allUserCredentials, setAllUserCredentials] = useState([]);
	const [userCredentials, setuserCredentials] = useState({
		"full-name": "",
		email: "",
		password: "",
		"confirm-password": "",
	});

	const handleInputChange = (input, value) => {
		setuserCredentials((previousCred) => {
			return { ...previousCred, [input]: value };
		});
	};

	const isValidCredentials = (userCredentials) => {
		const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

		let passwordPattern = {
			numbers: "0123456789",
			alphabets: "abcdefghijklmnopqrstuvwxyz",
			specialChars: "!@#$%^&*+.,/-_",
		};

		const passwordString =
			"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*-+=_?/.";

		let isValidEmail = emailPattern.test(userCredentials["email"]);
		// console.log("isValidEmail :", isValidEmail);

		// password = #Ayush123
		// console.log(userCredentials["password"]);

		let isValidPassword =
			userCredentials["password"].length > 6 &&
			userCredentials["password"] === userCredentials["confirm-password"];

		// console.log("isValidPassword :", isValidPassword);

		isValidEmail && isValidPassword
			? allUserCredentials.push(userCredentials)
			: console.log("credentials are not proper");

		// console.log("allUserCredentials", allUserCredentials);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		isValidCredentials(userCredentials);
		// console.table(userCredentials);
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
							id="full-name"
							value={userCredentials["full-name"]}
							onChange={(e) =>
								handleInputChange("full-name", e.target.value)
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
						Already have an account ? <span>Sign In</span>
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
