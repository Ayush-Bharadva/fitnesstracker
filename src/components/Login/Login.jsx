import React, { useContext, useState } from "react";
import Card from "../UI/Card";
import "../styles/General.scss";
import poster from "../../assets/images/signup_poster.jpg";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import { userLogInService } from "../../services/services";

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

	const handleLoginSubmit = async (e) => {
		e.preventDefault();

		const response = await userLogInService(userCredentials);
		console.log(response.status);
		console.log(response);
		if (response.status === 200) {
			logIn();
			navigate("/");
		}
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
