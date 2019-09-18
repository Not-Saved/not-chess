import React from "react";
import { withRouter } from "react-router-dom";

import Card from "./Card";
import "../styles/gameCard.css";

const GameCard = ({ game, history }) => {
	const renderTopRight = () => {
		if (game.whitePlayer.name && game.blackPlayer.name) {
			return (
				<div className="top right angle">
					<i
						className={`external fitted clickable icon`}
						onClick={() => history.push(`/chess/${game.id}`, game)}
					/>
				</div>
			);
		}
		return (
			<div className="top right angle">
				<i className={`user times fitted icon`} />
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
							<i className="hashtag icon" />
							<span className="sub text">{game.id}</span>
						</div>
					</div>
					<div className="column zero-padding">
						<div>
							<i className="calendar icon" />
							<span className="sub text">
								{game.date.toLocaleDateString()}
							</span>
						</div>
					</div>
					<div className="column zero-padding">
						<div>
							<i className="clock icon" />
							<span className="sub text">
								{game.date.toLocaleTimeString().slice(0, -3)}
							</span>
						</div>
					</div>
					<div className="column zero-padding">
						<div>
							<i className="hourglass icon" />
							<span className="sub text">
								{Math.floor(game.moves.length / 2 + 1)}
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

		const icon = direction => {
			return (
				<div className="six wide center aligned column zero-padding">
					<i className="big icons">
						<i className="main small user circle fitted icon" />
						{player.host ? (
							<i
								className={`chess king fitted top ${direction} corner sub icon`}
							/>
						) : null}
					</i>
				</div>
			);
		};

		if (player.name) {
			if (color === "White") {
				return (
					<div className="ui middle aligned grid zero-margin ">
						{playerHeader("right")}
						{icon("left")}
					</div>
				);
			} else {
				return (
					<div className="ui middle aligned grid zero-margin">
						{icon("right")}
						{playerHeader("left")}
					</div>
				);
			}
		}
		return null;
	};

	return (
		<Card>
			<div className="game-card" style={{ position: "relative" }}>
				<div style={{ position: "relative" }}>
					{renderTopRight()}
					{renderBottomLeft()}
					<div
						className="ui two column grid zero-margin"
						style={{ padding: "10px" }}
					>
						<div
							className="center aligned column"
							style={{ padding: "0px 20px 0px 0px" }}
						>
							{renderPlayer(game.whitePlayer, "White")}
						</div>
						<div
							className="middle aligned column"
							style={{ padding: "0px 0px 0px 20px" }}
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

export default withRouter(GameCard);
