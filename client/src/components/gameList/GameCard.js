import React from "react";

import Card from "../Card";
import {
	getGameStateString,
	getGameStateIcon,
	getTimeSinceUpdated
} from "../../util";
import "../../styles/gameCard.css";

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
				<i
					className={`${getGameStateIcon(
						game.state
					)} grey fitted icon`}
				/>
			</div>
		);
	};

	const renderBottomLeft = () => {
		return (
			<div className="bottom left angle">
				<i className="grey hashtag icon" />
				<span className="sub text" style={{ marginRight: 10 }}>
					{game.gameId}
				</span>
				<i className="grey clock icon" />
				<span className="sub text">
					{getTimeSinceUpdated(game.lastUpdated)}
				</span>
			</div>
		);
	};

	const renderFooter = () => {
		return (
			<div className="footer">
				<div
					className="ui divider"
					style={{ margin: "8px 15px" }}
				></div>
				<div
					className="ui four column center aligned grid zero-margin nc-font-size"
					style={{ padding: "5px 0px" }}
				>
					<div className="column zero-padding">
						<div>
							<i className="hashtag sub icon" />
							<span className="sub text">{game.gameId}</span>
						</div>
					</div>
					<div className="column zero-padding">
						<div>
							<i className="calendar sub icon" />
							<span className="sub text">
								{new Date(
									game.lastUpdated
								).toLocaleDateString()}
							</span>
						</div>
					</div>
					<div className="column zero-padding">
						<div>
							<i className="clock sub icon" />
							<span className="sub text">
								{new Date(game.lastUpdated)
									.toLocaleTimeString()
									.slice(0, -3)}
							</span>
						</div>
					</div>
					<div className="column zero-padding">
						<div>
							<i
								className={`${getGameStateIcon(
									game.state
								)} sub icon`}
							/>
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

		const playerHeader = direction => (
			<div
				className={`ten wide column ${direction} aligned player`}
				style={{
					padding:
						direction === "left"
							? "0px 0px 0px 7px"
							: "0px 7px 0px 0px"
				}}
			>
				<h2 className="ui header">
					<div className="player">
						<span className="name">{player._user.userName}</span>
						<div className="sub header">
							<span>{colorString}</span>
						</div>
					</div>
				</h2>
			</div>
		);

		const icon = () => {
			return (
				<div className="six wide center aligned column zero-padding">
					<i className="big icons">
						<img
							src={`/${player._user.icon}`}
							className="ui circular middle aligned main image"
							alt=""
						/>
						<i
							className="play top left corner turn icon"
							style={{
								visibility:
									userPlayer &&
									userPlayer.color === color &&
									userPlayer.color === game.turn
										? "visible"
										: "hidden"
							}}
						></i>
						<i
							className="user bottom right corner my icon"
							style={{
								visibility:
									userPlayer && userPlayer.color === color
										? "visible"
										: "hidden"
							}}
						></i>
					</i>
				</div>
			);
		};

		if (color === "w") {
			if (player._user) {
				return (
					<div className="ui middle aligned grid zero-margin">
						{playerHeader("right")}
						{icon("left")}
					</div>
				);
			} else {
				return (
					<div className="ui middle aligned grid zero-margin">
						<div
							className={`ten wide column right aligned player`}
							style={{ padding: "0px 7px 0px 0px" }}
						>
							<h2 className="ui grey header">
								<div className="player">
									<span className="name">Join</span>
									<div className="sub header">
										<span>{colorString}</span>
									</div>
								</div>
							</h2>
						</div>
						<div className="six wide center aligned column zero-padding">
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center"
								}}
							>
								<i
									className={`big user circle empty fitted icon`}
								/>
							</div>
						</div>
					</div>
				);
			}
		} else {
			if (player._user) {
				return (
					<div className="ui middle aligned grid zero-margin">
						{icon("right")}
						{playerHeader("left")}
					</div>
				);
			} else {
				return (
					<div className="ui middle aligned grid zero-margin">
						<div className="six wide center aligned column zero-padding">
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center"
								}}
							>
								<i
									className={`big user circle empty fitted icon`}
								/>
							</div>
						</div>
						<div
							className={`ten wide column left aligned player`}
							style={{ padding: "0px 0px 0px 7px" }}
						>
							<h2 className="ui grey header">
								<div className="player">
									<span className="name">Join</span>
									<div className="sub header">
										<span>{color}</span>
									</div>
								</div>
							</h2>
						</div>
					</div>
				);
			}
		}
	};

	return (
		<Card>
			<div
				className="game-card"
				style={{ position: "relative", cursor: "pointer" }}
				onClick={onClick}
			>
				<div style={{ position: "relative" }}>
					{renderTopRight()}
					{renderBottomLeft()}
					<div
						className="ui two column grid zero-margin"
						style={{ padding: "10px" }}
					>
						<div
							className="middle aligned column"
							style={{ padding: "0px 1em 0px 0px" }}
						>
							{renderPlayer(game.whitePlayer, "w")}
						</div>
						<div
							className="middle aligned column"
							style={{ padding: "0px 0px 0px 1em" }}
						>
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
