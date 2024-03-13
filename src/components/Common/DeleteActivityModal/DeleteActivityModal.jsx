import { createPortal } from "react-dom";
import { PropTypes } from "prop-types";
import { BsExclamationCircle } from "react-icons/bs";
import "./DeleteActivityModal.scss";

function DeleteActivityModal({ onConfirmDelete, onCancel }) {
	const modalNode = document.getElementById("delete-modal");

	return createPortal(
		<dialog className="modal-container">
			<div className="modal">
				<div className="icon">
					<BsExclamationCircle />
				</div>
				<div className="text">
					<h2>Are you sure?</h2>
					<p>You won&apos;t be able to revert this!</p>
				</div>
				<div className="actions">
					<button
						className="confirm-btn modal-btn"
						onClick={onConfirmDelete}>
						Yes, delete it!
					</button>
					<button
						className="cancel-btn modal-btn"
						onClick={onCancel}>
						Cancel
					</button>
				</div>
			</div>
		</dialog>,
		modalNode
	);
}

export default DeleteActivityModal;

DeleteActivityModal.propTypes = {
	onConfirmDelete: PropTypes.func,
	onCancel: PropTypes.func,
};
