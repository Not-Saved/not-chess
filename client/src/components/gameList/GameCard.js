import React from "react";

import Card from "../Card";
import "../../styles/gameCard.css";
import { getGameStateString } from "../../util";

const GameCard = ({ game, onClick }) => {
	const renderTopRight = () => {
		return (
			<div className="top right angle">
				<i
					className={`lock fitted icon`}
					style={{
						visibility: game.locked ? "visible" : "hidden"
					}}
				/>
			</div>
		);
	};

	const renderBottomLeft = () => {
		return (
			<div className="bottom left angle">
				<i className="hashtag fitted icon" />
				<span className="sub text"> {game.id}</span>
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
							<span className="sub text">{game.id}</span>
						</div>
					</div>
					<div className="column zero-padding">
						<div>
							<i className="calendar sub icon" />
							<span className="sub text">
								{game.date.toLocaleDateString()}
							</span>
						</div>
					</div>
					<div className="column zero-padding">
						<div>
							<i className="clock sub icon" />
							<span className="sub text">
								{game.date.toLocaleTimeString().slice(0, -3)}
							</span>
						</div>
					</div>
					<div className="column zero-padding">
						<div>
							<i className="hourglass sub icon" />
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
		const text = (
			<h2 className="ui header">
				<div className="player">
					<span className="name">{player.name}</span>
					<div className="sub header">
						<span>{color}</span>
					</div>
				</div>
			</h2>
		);
		const playerHeader = direction => (
			<div
				className={`ten wide column ${direction} aligned player`}
				style={{ padding: "0px 5px" }}
			>
				{player.name ? text : null}
			</div>
		);

		const icon = () => {
			return (
				<div className="six wide center aligned column zero-padding">
					<img
						src={`/${player.icon}`}
						className="ui circular middle aligned main image"
						alt=""
					/>
				</div>
			);
		};

		if (color === "White") {
			if (player.name) {
				return (
					<div className="ui middle aligned grid zero-margin ">
						{playerHeader("right")}
						{icon("left")}
					</div>
				);
			} else {
				return (
					<div className="ui middle aligned grid zero-margin">
						<div className="ten wide center aligned column zero-padding"></div>
						<div className="six wide center aligned column zero-padding">
							<i className={`circle empty fitted icon`} />
						</div>
					</div>
				);
			}
		} else {
			if (player.name) {
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
							<i className={`circle empty fitted icon`} />
						</div>
						<div className="ten wide center aligned column zero-padding"></div>
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
							{renderPlayer(game.whitePlayer, "White")}
						</div>
						<div
							className="middle aligned column"
							style={{ padding: "0px 0px 0px 1em" }}
						>
							{renderPlayer(game.blackPlayer, "Black")}
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
