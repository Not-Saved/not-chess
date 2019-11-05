import React from "react";

import "./userIcons.css";

const UserIcons = ({ onClick }) => {
	return (
		<div className="user icons grid">
			{icons.map(icon => (
				<img
					src={`/${icon}`}
					className="ui circular image clickable"
					key={icon}
					name="icon"
					value={icon}
					onClick={onClick}
					alt=""
				/>
			))}
		</div>
	);
};

const icons = [
	"patrick.jpg",
	"eve.jpg",
	"jenny.jpg",
	"joe.jpg",
	"mark.jpg",
	"kristy.jpg",
	"molly.jpg",
	"matthew.jpg",
	"daniel.jpg",
	"elyse.jpg",
	"elliot.jpg",
	"helen.jpg",
	"nan.jpg",
	"rachel.jpg",
	"steve.jpg",
	"stevie.jpg"
];

export default UserIcons;
