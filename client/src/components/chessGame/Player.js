import React from "react";
import "../../styles/player.css";

const Player = ({ position, turn, player, playerField }) => {
	let playerColor = playerField === "whitePlayer" ? "w" : "b";
	let visibility = playerColor === turn ? "visible" : "hidden";
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
							className="hourglass half turn fitted icon"
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
							className="hourglass half turn fitted icon"
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
