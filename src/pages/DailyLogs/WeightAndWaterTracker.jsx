import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { addWater, addWeight, editWater, editWeight } from "../../services/services";
import { showToast } from "../../utils/helper";
import "./DailyLogs.scss";
import { TrackerConfig } from "../../constants/constants";

function WeightAndWaterTracker({ type, setAllDetails, value }) {
	const [inputValue, setInputValue] = useState(value);
	const [isInputDisabled, setIsInputDisabled] = useState(!!value);

	useEffect(() => {
		setInputValue(value);
		setIsInputDisabled(!!value);
	}, [value]);

	const handleApiCall = async (apiCall) => {
		try {
			const response = await apiCall(Number(inputValue));
			if (response.status === 200) {
				setIsInputDisabled(true);

				const detailsKey = type === "weight" ? "weightDetails" : "waterDetails";

				setAllDetails((prevDetails) => ({
					...prevDetails,
					[detailsKey]: {
						[type === "weight" ? "dailyWeight" : "waterIntake"]: inputValue,
					},
				}));

				showToast("success", "Data Saved Successfully..");
			}
		} catch (error) {
			showToast("error", "An Error Occured while Updating Data!!");
		}
	};

	const handleSubmit = () => {
		if (!inputValue) {
			showToast("error", "Please Enter Valid Value!!");
			return;
		}
		const addApiCall = type === "weight" ? addWeight : addWater;
		const editApiCall = type === "weight" ? editWeight : editWater;
		const apiCall = !value ? addApiCall : editApiCall;
		handleApiCall(apiCall);
	};

	let dailyValue = type === "weight" ? inputValue + " Kgs" : inputValue + " Ltrs";

	return (
		<div id="tracking-section">
			<h3>{TrackerConfig.type}</h3>
			<div className="tracker-container">
				<h2 className="title">{TrackerConfig.type}</h2>
				<div className="actions">
					{!isInputDisabled ? (
						<input
							type="text"
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							disabled={isInputDisabled}
							placeholder={`Today's ${TrackerConfig.type}`}
						/>
					) : (
						<p>{dailyValue}</p>
					)}
					<button className="action-btn" onClick={isInputDisabled ? () => setIsInputDisabled(false) : handleSubmit}>
						{isInputDisabled ? "Edit" : "Save"}
					</button>
				</div>
			</div>
		</div>
	);
}

export default WeightAndWaterTracker;

WeightAndWaterTracker.propTypes = {
	value: PropTypes.number,
	setAllDetails: PropTypes.func,
	type: PropTypes.string,
};
