import { useState } from "react";
import VerifyEmailModal from "./VerifyEmailModal";
import VerifyOTPModal from "./VerifyOTPModal";
import "./Modal.scss";
// import Modal from "./Modal";

function ForgotPasswordModal() {
	const [showEmailModal, setShowEmailModal] = useState(true);
	const [showOTPModal, setShowOTPModal] = useState(false);

	const onSubmitEmail = e => {
		e.preventDefault();
		setShowOTPModal(true);
	};

	return (
		<>
			{showEmailModal && (
				<VerifyEmailModal
					close={() => setShowEmailModal(false)}
					onSubmit={onSubmitEmail}
				/>
			)}
			{showOTPModal && <VerifyOTPModal close={() => setShowOTPModal(false)} />}
		</>
	);
}

export default ForgotPasswordModal;
