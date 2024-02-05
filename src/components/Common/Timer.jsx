import { useEffect, useRef, useState } from "react";
import { PropTypes } from "prop-types";
import { showToast } from "../../utils/helper";

export function Timer({ resendOtp }) {
	const [seconds, setSeconds] = useState(60);
	const resendBtn = useRef();

	useEffect(() => {
		if (resendBtn) {
			resendBtn.current.disabled = true;
		}
	}, []);

	useEffect(() => {
		if (seconds <= 0) {
			if (resendBtn.current) {
				console.log("here");
				resendBtn.current.disabled = false;
				resendBtn.current.classList.add("enable");
			}
			return;
		}

		const timer = setInterval(() => {
			setSeconds(seconds => seconds - 1);
		}, 1000);

		return () => {
			clearInterval(timer);
		};
	}, [seconds]);

	const resetTimer = () => {
		resendOtp();
		setSeconds(60);
		showToast("success", "OTP sent successfully..");
	};

	const formatTimer = remainingSeconds => {
		const minutes = Math.floor(remainingSeconds / 60)
			.toString()
			.padStart(2, "0");
		const seconds = (remainingSeconds % 60).toString().padStart(2, "0");
		return `${minutes}:${seconds}`;
	};

	const time = formatTimer(seconds);

	return (
		<div className="timer">
			<p className="time-remaining-text">Time Remaining : {time}</p>
			<button
				ref={resendBtn}
				onClick={resetTimer}
				className="resend-otp-btn">
				Resend OTP
			</button>
		</div>
	);
}

export default Timer;

Timer.propTypes = {
	resendOtp: PropTypes.func,
	timerSeconds: PropTypes.number
};
