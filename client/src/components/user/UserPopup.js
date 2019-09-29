import React, { useState } from "react";
import { Popup } from "semantic-ui-react";

const UserPopup = ({ history, user, logout }) => {
	const [open, setOpen] = useState(false);
	const renderContent = () => {
		return (
			<div>
				<h3
					className="ui header"
					style={{ marginBottom: 5, textAlign: "center" }}
				>
					<img
						className="ui circular mini image"
						src={`/${user && user.icon}`}
						alt=""
					/>
					<span
						style={{
							fontSize: 17,
							margin: 5,
							verticalAlign: "bottom"
						}}
					>
						{user && user.userName.toUpperCase()}
					</span>
				</h3>
				<div
					className="ui divider"
					style={{ margin: "0px -5px 5px -5px" }}
				></div>
				<div style={{ marginBottom: 5 }}>
					<button
						className="ui fluid basic button"
						style={{
							fontWeight: "bold"
						}}
						onClick={() => {
							setOpen(false);
							history.push("/user/settings");
						}}
					>
						<i
							className="user fitted icon"
							style={{ paddingRight: 10 }}
						></i>
						Settings
					</button>
				</div>
				<div>
					<button
						className="ui fluid button"
						style={{ fontWeight: "bold" }}
						onClick={async () => {
							setOpen(false);
							await logout();
							history.push("/login");
						}}
					>
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

	return (
		<Popup
			content={renderContent()}
			trigger={
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						textAlign: "center",
						cursor: "pointer"
					}}
				>
					<img
						className="ui circular image"
						src={`/${user.icon}`}
						alt=""
						style={{ height: 35, margin: "0px 13px" }}
					></img>
				</div>
			}
			open={open}
			onOpen={() => setOpen(true)}
			onClose={() => setOpen(false)}
			position="top right"
			hoverable
			offset="-10px,-18px"
		/>
	);
};

export default UserPopup;
