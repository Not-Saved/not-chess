import React from "react";

import { getGameStateString, getGameStateIcon, getTimeSinceUpdated } from "util/index";
import Card from "components/Card";

import "./gameCard.css";

const GameCard = ({ game, user, onClick }) => {
	const getUserPlayer = () => {
		let player = null;
		if (!user) return player;
		if (game.whitePlayer._user && game.whitePlayer._user.id === user.id)
			player = game.whitePlayer;
		if (game.blackPlayer._user && game.blackPlayer._user.id === user.id)
			player = game.blackPlayer;
		return player;
	};

	const renderTopRight = () => {
		return (
			<div className="top right angle">
				<i className={`${getGameStateIcon(game.state)} fitted icon`} />
			</div>
		);
	};

	const renderBottomLeft = () => {
		return (
			<div className="bottom left angle">
				<i className="clock icon" />
				<span className="sub text">{getTimeSinceUpdated(game.lastUpdated)}</span>
			</div>
		);
	};

	const renderFooter = () => {
		return (
			<div className="game card footer">
				<div className="ui divider" style={{ margin: "8px 15px" }}></div>
				<div
					className="ui four column center aligned grid zero margin nc-font-size"
					style={{ padding: "5px 0px" }}
				>
					<div className="column zero padding">
						<div>
							<i className="hashtag sub icon" />
							<span className="sub text">{game.gameId}</span>
						</div>
					</div>
					<div className="column zero padding">
						<div>
							<i className="calendar sub icon" />
							<span className="sub text">
								{new Date(game.createdAt).toLocaleDateString()}
							</span>
						</div>
					</div>
					<div className="column zero padding">
						<div>
							<i className="clock sub icon" />
							<span className="sub text">
								{getTimeSinceUpdated(game.lastUpdated)}
							</span>
						</div>
					</div>
					<div className="column zero padding">
						<div>
							<i className={`${getGameStateIcon(game.state)} sub icon`} />
							<span className="sub text">
								{getGameStateString(game.state)}
							</span>
						</div>
					</div>
				</div>
			</div>
		);
	};

	const renderPlayer = (player, color) => {
		const userPlayer = getUserPlayer();
		const colorString = color === "b" ? "Black" : "White";

		const isPlayIconVisible =
			userPlayer &&
			userPlayer.color === color &&
			userPlayer.color === game.turn &&
			game.state === "IN_PROGRESS"
				? "visible"
				: "hidden";

		const isMyIconVisible =
			userPlayer && userPlayer.color === color ? "visible" : "hidden";

		const playerHeader = () => {
			if (player._user) {
				return (
					<h2 className="ui header">
						<div className="player">
							<span className="name">{player._user.userName}</span>
							<div className="sub header">
								<span>{colorString}</span>
							</div>
						</div>
					</h2>
				);
			} else {
				return (
					<h2 className="ui grey header">
						<div className="player">
							<span className="name">Join</span>
							<div className="sub header">
								<span>{colorString}</span>
							</div>
						</div>
					</h2>
				);
			}
		};

		const icon = () => {
			if (player._user) {
				return (
					<i className="big icons">
						<img
							src={`/${player._user.icon}`}
							className="ui circular middle aligned main image"
							alt=""
						/>
						<i
							className="play bottom left corner turn icon"
							style={{ visibility: isPlayIconVisible }}
						></i>
						<i
							className="circle bottom right corner my icon"
							style={{ visibility: isMyIconVisible }}
						></i>
					</i>
				);
			} else {
				return (
					<div className="flex center">
						<i className="big user circle empty fitted icon" />
					</div>
				);
			}
		};

		if (color === "w") {
			return (
				<div className="ui middle aligned grid zero margin padding">
					<div className="ten wide column right aligned player">
						{playerHeader("right")}
					</div>
					<div className="six wide center aligned column zero padding">
						{icon("left")}
					</div>
				</div>
			);
		} else {
			return (
				<div className="ui middle aligned grid zero margin padding">
					<div className="six wide center aligned column zero padding">
						{icon("right")}
					</div>
					<div className="ten wide column left aligned player">
						{playerHeader("left")}
					</div>
				</div>
			);
		}
	};

	return (
		<Card style={{ marginTop: 12 }}>
			<div className="game card clickable" onClick={onClick}>
				<div style={{ position: "relative" }}>
					{renderTopRight()}
					{renderBottomLeft()}
					<div className="ui equal width grid zero margin">
						<div className="middle aligned white-player column">
							{renderPlayer(game.whitePlayer, "w")}
						</div>
						<div className="middle aligned black-player column">
							{renderPlayer(game.blackPlayer, "b")}
						</div>
					</div>
					<div className="ui vertical divider">VS</div>
				</div>
				{renderFooter()}
			</div>
		</Card>
	);
};

export default GameCard;
