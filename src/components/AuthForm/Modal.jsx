import { PropTypes } from "prop-types";
import "./modal.scss";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = forwardRef(function Modal({ children }, ref) {
	console.log(ref);

	const dialog = useRef();

	useImperativeHandle(ref, () => {
		return {
			open() {
				dialog.current.showModal();
			}
		};
	});

	return createPortal(
		<dialog
			ref={dialog}
			className="modal">
			<h1>dialog</h1>
			<form method="dialog">
				<button>close</button>
			</form>
			{children}
		</dialog>,
		document.getElementById("forgot-password-modal")
	);
});

export default Modal;

Modal.propTypes = {
	children: PropTypes.node,
	onClose: PropTypes.func
	// closeModal: PropTypes.func,
	// modalFor: PropTypes.string,
	// title: PropTypes.string,
	// subtitle: PropTypes.string,
	// onSubmit: PropTypes.func
};
