import React from "react";
import "../../styles/player.css";

const Player = ({ position, turn, player, winner }) => {
	let visibility = "hidden";
	let icon = "hourglass half";
	if (winner) {
		turn = null;
		visibility = player.color === winner.color ? "visible" : "hidden";
		icon = winner.color === player.color ? "trophy" : icon;
	}
	visibility = player.color === turn ? "visible" : visibility;

	if (position === "up") {
		return (
			<div className="player">
				<div className="main flexbox">
					<img
						src={`/${player.icon}`}
						className="ui circular player middle aligned image"
						alt=""
						style={{ marginRight: 7 }}
					/>

					<div className="text" style={{ marginRight: 7 }}>
						{player.name}
					</div>

					<div className="text">
						<i
							className={`${icon} turn fitted icon`}
							style={{ visibility }}
						></i>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className="player">
				<div className="main flexbox">
					<div className="text">
						<i
							className={`${icon} turn fitted icon`}
							style={{ visibility }}
						></i>
					</div>
					<div className="text" style={{ marginLeft: 7 }}>
						{player.name}
					</div>
					<img
						src={`/${player.icon}`}
						className="ui circular player middle aligned image"
						alt=""
						style={{ marginLeft: 7 }}
					/>
				</div>
			</div>
		);
	}
};
export default Player;
