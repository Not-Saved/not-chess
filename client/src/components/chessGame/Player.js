import React from "react";

import "./player.css";

const Player = ({ position, turn, player, winner }) => {
	let icon = "play";
	let visibility = "hidden";
	if (winner) {
		turn = null;
		visibility = player.color === winner.color ? "visible" : "hidden";
		icon = winner.color === player.color ? "trophy" : icon;
	}
	visibility = player.color === turn ? "visible" : visibility;

	if (position === "up") {
		return (
			<div className="player">
				<div className="main flexbox left">
					<i className="icons">
						<img
							src={`/${player._user.icon}`}
							className="ui circular player middle aligned image"
							alt=""
						/>
						<i
							className={`top left corner ${icon} turn icon`}
							style={{ visibility }}
						/>
					</i>

					<div className="left text">{player._user.userName}</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className="player">
				<div className="main flexbox right">
					<div className="right text">{player._user.userName}</div>
					<i className="icons">
						<img
							src={`/${player._user.icon}`}
							className="ui circular player middle aligned image"
							alt=""
						/>
						<i
							className={`top left corner ${icon} turn icon`}
							style={{ visibility }}
						/>
					</i>
				</div>
			</div>
		);
	}
};
export default Player;
