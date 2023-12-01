import React, { useEffect, useState } from "react";
import {
	addWaterService,
	addWeightService,
	editWaterService,
	editWeightService,
} from "../../services/services";
import "./DailyGoals.scss";
import { toast } from "react-toastify";

function WeightAndWaterTracker({ heading, title, value, setAllDetails, type }) {
	useEffect(() => {
		setInputValue(value);
	}, [value]);

	const showToast = (type, message) => {
		toast[type](message, { position: toast.POSITION.TOP_RIGHT });
	};

	const [inputValue, setInputValue] = useState(value);
	const [isInputDisabled, setIsInputDisabled] = useState(
		inputValue ? true : false
	);

	const handleApiCall = async (apiCall) => {
		try {
			const response = await apiCall(Number(inputValue));
			if (response.status === 200) {
				setIsInputDisabled(true);
				setAllDetails((prevDetails) =>
					type === "weight"
						? {
								...prevDetails,
								weightDetails: { dailyWeight: inputValue },
						  }
						: {
								...prevDetails,
								waterDetails: { waterIntake: inputValue },
						  }
				);
				showToast("success", "Data Saved Successfully..");
			}
		} catch (error) {
			// showToast("error", "An Error Occured while Updating Data!!");
		}
	};

	const handleSubmit = () => {
		const addApiCall =
			type === "weight" ? addWeightService : addWaterService;
		const editApiCall =
			type === "weight" ? editWeightService : editWaterService;
		const apiCall = !value ? addApiCall : editApiCall;
		handleApiCall(apiCall);
	};

	return (
		<div id="tracking-section">
			<h3>{heading}</h3>
			<div className="tracker-container">
				<h3 className="title">{title}</h3>
				<div className="actions">
					<input
						type="text"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						disabled={isInputDisabled}
						placeholder="Today's Weight (Kgs)"
					/>
					{!isInputDisabled ? (
						<button
							className="action-btn"
							onClick={() => {
								handleSubmit();
							}}>
							Save
						</button>
					) : (
						<button
							className="action-btn"
							onClick={() => {
								setIsInputDisabled(false);
							}}>
							Edit
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default WeightAndWaterTracker;
