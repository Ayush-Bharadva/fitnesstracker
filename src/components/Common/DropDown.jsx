import React, { useState } from "react";

function DropDown() {
	const dropDownItems = [1, 2, 3, 4, 5, 665];

	const [isDropDownOpen, setIsDropDownOpen] = useState(false);

	const handleClick = (e) => {
		console.log(e.target.textContent);
	};

	return (
		<>
			<button
				className="dropdown-button"
				onClick={() => setIsDropDownOpen((prevState) => !prevState)}>
				Dropdown
			</button>
			{isDropDownOpen && (
				<div className="dropdown">
					<ul className="dropdown-items">
						{dropDownItems.map((item) => (
							<li
								key={item}
								onClick={handleClick}
								className="dropdown-item">
								{item}
							</li>
						))}
					</ul>
				</div>
			)}
		</>
	);
}

export default DropDown;
