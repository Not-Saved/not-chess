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
	"patrick.png",
	"eve.png",
	"jenny.jpg",
	"joe.jpg",
	"mark.png",
	"kristy.png",
	"molly.png",
	"matthew.png",
	"daniel.jpg",
	"elyse.png",
	"elliot.jpg",
	"helen.jpg",
	"nan.jpg",
	"rachel.png",
	"steve.jpg",
	"stevie.jpg"
];

export default UserIcons;
