import { PropTypes } from "prop-types";
import "./modal.scss";
import { CiMail } from "react-icons/ci";

function Modal({ children, closeModal, modalFor, title, subtitle, onSubmit }) {
	const Input =
		modalFor === "email" ? (
			<>
				<CiMail className="mail-icon" />
				<input
					type="email"
					placeholder="Enter Email"
				/>
			</>
		) : (
			<input
				type="number"
				placeholder="Enter OTP"
			/>
		);

	return (
		<dialog className="modal">
			<form method="dialog">
				<button onClick={closeModal}>close</button>
			</form>
			<div className="verify-email-container">
				<button
					className="close-btn"
					onClick={close}>
					close
				</button>
				<h1>{title}</h1>
				<p>{subtitle}</p>
				<form action="">
					<div>{Input}</div>
					<button
						type="submit"
						onClick={onSubmit}>
						Submit
					</button>
				</form>
			</div>
			{children}
		</dialog>
	);
}

export default Modal;

Modal.propTypes = {
	children: PropTypes.node,
	closeModal: PropTypes.func,
	modalFor: PropTypes.string,
	title: PropTypes.string,
	subtitle: PropTypes.string,
	onSubmit: PropTypes.func
};
