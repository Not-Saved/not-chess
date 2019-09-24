import React from "react";

const UserIcons = ({ onClick }) => {
	return (
		<div
			style={{
				display: "inline-grid",
				gridTemplateColumns: "repeat(4, 50px)",
				gridTemplateRows: "repeat(4, 50px)"
			}}
		>
			{icons.map(icon => (
				<img
					src={`/${icon}`}
					className="ui circular image"
					key={icon}
					name={icon}
					onClick={onClick}
					alt=""
					style={{
						height: 45,
						width: 45,
						margin: "0px 2px",
						cursor: "pointer"
					}}
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
