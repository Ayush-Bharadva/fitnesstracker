import { useState } from "react";
import "./ForgotPasswordPage.scss";
import VerifyEmail from "./VerifyEmail";
import VerifyOTP from "./VerifyOTP";
import SetNewPassword from "./SetNewPassword";
import { ResetPassword } from "../../constants/constants";

function ForgotPasswordPage() {
	const [data, setData] = useState({});
	const [step, setStep] = useState(1);

	const handleNextStep = (key, value) => {
		setStep(prev => prev + 1);
		if (key) {
			setData(prev => ({ ...prev, [key]: value }));
		}
	};

	return (
		<div id="forgot-password-page-container">
			{step === ResetPassword.verifyEmail && <VerifyEmail handleNext={handleNextStep} />}
			{step === ResetPassword.verifyOTP && (
				<VerifyOTP
					handleNext={handleNextStep}
					data={data}
				/>
			)}
			{step === ResetPassword.setNewPassword && (
				<SetNewPassword
					handleNext={handleNextStep}
					data={data}
				/>
			)}
		</div>
	);
}

export default ForgotPasswordPage;
