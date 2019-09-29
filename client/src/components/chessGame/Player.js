import React from "react";
import "../../styles/player.css";

const Player = ({ position, turn, player, winner }) => {
	let visibility = "hidden";
	let icon = "play";

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

					<div className="text" style={{ marginLeft: 7 }}>
						{player._user.userName}
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className="player">
				<div className="main flexbox">
					<div className="text" style={{ marginRight: 7 }}>
						{player._user.userName}
					</div>
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
