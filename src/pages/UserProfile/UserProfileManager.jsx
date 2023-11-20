import React from "react";

function UserProfileManager() {
	return (
		<>
			<div className="profile-container">
				<h2>Profile Image</h2>
				<div className="image-container">
					<img
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRcbAfbjsK1ZBphebpOkRbkbOMshLEeNnNxQ&usqp=CAU"
						alt="profile image"
					/>
				</div>
				<button className="edit-image-btn">Change image</button>
			</div>
			<div className="info-container">
				<form action="">
					<div className="form-container">
						<h2>Profile Details</h2>
						<div className="field-container">
							<label>Full Name</label>
							<input
								type="text"
								className="content-text"
								placeholder="FullName"
							/>
						</div>
						<div className="field-container">
							<label>Gender</label>
							<input
								type="text"
								className="content-text"
								placeholder="Gender"
							/>
						</div>
						<div className="field-container">
							<label>Age</label>
							<input
								type="text"
								inputMode="numeric"
								className="content-text"
								placeholder="Age"
							/>
						</div>
						<div className="field-container">
							<label>height</label>
							<input
								type="text"
								className="content-text"
								placeholder="Height"
							/>
						</div>
						<div className="field-container">
							<label>weight</label>
							<input
								type="text"
								className="content-text"
								placeholder="Weight"
							/>
						</div>
						<div className="field-container">
							<label>Fitness Goal</label>
							<input
								type="text"
								className="content-text"
								placeholder="Fitness Goal"
							/>
						</div>
						<button className="update-profile-button" type="submit">
							Save Profile
						</button>
					</div>
				</form>
			</div>
		</>
	);
}

export default UserProfileManager;
