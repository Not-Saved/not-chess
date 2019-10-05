import React, { useState } from "react";
import { Popup } from "semantic-ui-react";

import "./userPopup.css";

const UserPopup = ({ history, user, onLogout }) => {
	const [open, setOpen] = useState(false);

	const onUserSettingsClick = () => {
		setOpen(false);
		history.push("/user/settings");
	};

	const onLogoutClick = () => {
		setOpen(false);
		onLogout();
	};

	const renderContent = () => {
		return (
			<div className="user popup">
				<h3 className="ui header">
					<img className="ui circular image" src={`/${user.icon}`} alt="" />
					<span>{user.userName.toUpperCase()}</span>
				</h3>
				<div className="ui divider"></div>
				<div className="content">
					<div>
						<button
							className="ui fluid basic button"
							onClick={onUserSettingsClick}
						>
							<i className="user fitted icon"></i>
							Settings
						</button>
					</div>
					<div>
						<button className="ui fluid button" onClick={onLogoutClick}>
							<i className="sign-out fitted icon"></i>
							Logout
						</button>
					</div>
				</div>
			</div>
		);
	};

	const renderTrigger = () => {
		return (
			<div className="flex center clickable">
				<img className="ui circular image" src={`/${user.icon}`} alt=""></img>
			</div>
		);
	};

	return (
		<Popup
			position="top right"
			offset="-11px,-18px"
			hoverable
			content={renderContent()}
			trigger={renderTrigger()}
			open={open}
			onOpen={() => setOpen(true)}
			onClose={() => setOpen(false)}
		/>
	);
};

export default UserPopup;
