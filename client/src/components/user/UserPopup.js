import React from "react";

const UserPopup = ({ history, logout }) => {
	return (
		<div>
			<div style={{ marginBottom: 10 }}>
				<button
					className="ui fluid large basic button"
					onClick={() => history.push("/user/settings")}
				>
					<i
						className="user fitted icon"
						style={{ paddingRight: 10 }}
					></i>
					Settings
				</button>
			</div>
			<div>
				<button className="ui fluid large button" onClick={logout}>
					<i
						className="sign-out fitted icon"
						style={{ paddingRight: 10 }}
					></i>
					Logout
				</button>
			</div>
		</div>
	);
};

export default UserPopup;
