import React, { useContext, useState } from "react";
import Card from "../UI/Card";
import "../styles/General.scss";
import poster from "../../refrences/signup_poster.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../userContext/AuthProvider";

const logInUrl = "http://localhost:8080/user/login";

function Login() {
	const navigate = useNavigate();
	const { logIn } = useContext(AuthContext);

	const [userCredentials, setuserCredentials] = useState({
		email: "",
		password: "",
	});

	const handleInputChange = (input, value) => {
		setuserCredentials((prevInput) => {
			return { ...prevInput, [input]: value };
		});
	};

	const handleLoginSubmit = (e) => {
		e.preventDefault();
		axios
			.post(logInUrl, JSON.stringify(userCredentials))
			.then((response) => {
				console.log(response);
				if (response.data === "Sucessfull login") {
					logIn();
					navigate("/");
				}
			})
			.catch((error) => console.log("login error :", error));
		console.log("userCredentials :", userCredentials);
	};

	return (
		<div className="container">
			<Card>
				<div className="login-poster">
					<img src={poster} alt="" />
				</div>
				<div className="login-card">
					<h2>LogIn</h2>
					<form
						action=""
						className="login-form"
						onSubmit={handleLoginSubmit}>
						<input
							type="email"
							value={userCredentials["email"]}
							onChange={(e) =>
								handleInputChange("email", e.target.value)
							}
							placeholder="email"
						/>
						<input
							type="password"
							value={userCredentials["password"]}
							onChange={(e) =>
								handleInputChange("password", e.target.value)
							}
							placeholder="password"
							autoComplete="on"
						/>
						<button type="submit" className="btn">
							LogIn
						</button>
					</form>
					<p>
						Don't have an account ?{" "}
						<span onClick={() => navigate("/signup")}>
							Register
						</span>
					</p>
				</div>
			</Card>
		</div>
	);
}

export default Login;
