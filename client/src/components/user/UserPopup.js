import React from "react";
import { Popup } from "semantic-ui-react";

const UserPopup = ({ history, user, logout }) => {
	const renderContent = () => {
		return (
			<div>
				<h3
					className="ui black header"
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
					<button className="ui fluid button" onClick={logout}>
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
						style={{ height: 38, margin: "0px 10px" }}
					></img>
				</div>
			}
			position="top right"
			hoverable
			offset="-10px,-16px"
		/>
	);
};

export default UserPopup;
