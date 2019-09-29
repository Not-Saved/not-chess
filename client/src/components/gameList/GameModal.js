import React from "react";
import { withRouter } from "react-router-dom";
import { Modal } from "semantic-ui-react";
import Card from "../Card";

import "../../styles/gameModal.css";
import { getGameStateString } from "../../util";

const GameModal = ({ history, open, setOpen, game, setGame, joinGame }) => {
	const onClose = () => {
		setOpen(false);
		setGame(null);
	};
	const onWatch = e => {
		e.stopPropagation();
		history.push(`/game/${game.id}`, game);
	};
	const onJoin = async () => {
		await joinGame(game.id);
		history.push(`/game/${game.id}`, game);
	};
	if (game) {
		return (
			<Modal
				closeOnDimmerClick
				basic
				onClose={onClose}
				open={open}
				className="nc-game-modal game modal"
			>
				<Card className="game modal card">
					<div style={{ position: "relative" }}>
						<div
							className="ui center aligned grid"
							style={{ margin: "0px" }}
						>
							<div className="grid row" style={{ padding: 7 }}>
								<h2 className="ui header">
									<i className="hashtag big icon"></i>
									<div className="content">
										{`${game.gameId}`}
									</div>
								</h2>
							</div>
							<div
								className="ui divider"
								style={{ margin: "0px 8% 8px 8%" }}
							></div>
							<div
								className="grid two column row"
								style={{ padding: "0px 4vw" }}
							>
								<div className="grid column">
									<button
										className="ui basic compact button"
										onClick={onWatch}
										style={{ width: "100%" }}
										disabled={
											!game.whitePlayer._user ||
											!game.blackPlayer._user
										}
									>
										<i className="eye icon"></i>
										Watch
									</button>
								</div>
								<div className="grid column">
									<button
										className="ui basic compact button"
										style={{ width: "100%" }}
										disabled={
											!game.whitePlayer._user ||
											!game.blackPlayer._user
										}
									>
										<i className="star icon"></i>
										Save
									</button>
								</div>
							</div>
							<div
								className="ui divider"
								style={{ margin: "8px 14px 14px 14px" }}
							></div>
							<div
								className="grid three column center aligned row "
								style={{ position: "relative", padding: 0 }}
							>
								<div
									className="grid seven wide column"
									style={{
										paddingRight: 0
									}}
								>
									<h2 className="ui icon header">
										{game.whitePlayer._user ? (
											<div
												className="player icon"
												style={{
													display: "flex",
													justifyContent: "center"
												}}
											>
												<img
													src={`/${game.whitePlayer._user.icon}`}
													className="ui circular image"
													alt={""}
												/>
											</div>
										) : (
											<div className="icon container">
												<i className="grey plus circle fitted player icon"></i>
											</div>
										)}
										<div className="content">
											{(game.whitePlayer._user &&
												game.whitePlayer._user
													.userName) || (
												<div
													style={{
														color: "gray"
													}}
												>
													Join
												</div>
											)}
											<div className="sub header">
												White
											</div>
										</div>
									</h2>
								</div>
								<div
									className="grid two wide column"
									style={{ padding: 0 }}
								>
									<div className="ui vertical divider">
										VS
									</div>
								</div>
								<div
									className="grid seven wide column"
									style={{ paddingLeft: 0 }}
								>
									<h2
										className="ui icon header"
										style={{
											cursor: game.blackPlayer._user
												? ""
												: "pointer"
										}}
									>
										{game.blackPlayer._user ? (
											<div
												className="player icon"
												style={{
													display: "flex",
													justifyContent: "center"
												}}
											>
												<img
													src={`/${game.blackPlayer._user.icon}`}
													className="ui circular image"
													alt={""}
												/>
											</div>
										) : (
											<div className="icon container">
												<i className="grey plus circle fitted player icon"></i>
											</div>
										)}
										<div className="content">
											{(game.blackPlayer._user &&
												game.blackPlayer._user
													.userName) || (
												<div
													style={{
														color: "gray"
													}}
												>
													Join
												</div>
											)}
											<div className="sub header">
												Black
											</div>
										</div>
									</h2>
								</div>
							</div>
							<div
								className="ui divider"
								style={{ margin: "5px 15px" }}
							></div>
							<div
								className="ui center aligned internally celled grid"
								style={{ margin: "0px 0px", padding: 0 }}
							>
								<div className="grid three column row">
									<div
										className="grid column"
										style={{ padding: 8 }}
									>
										<h5 className="ui tiny icon header">
											<i className="calendar sub fitted icon"></i>
											<div className="sub text content">
												{new Date(
													game.createdAt
												).toLocaleDateString()}
											</div>
										</h5>
									</div>
									<div
										className="grid column"
										style={{ padding: 8 }}
									>
										<h5 className="ui tiny icon header">
											<i className="clock sub fitted icon"></i>
											<div className="sub text content">
												{new Date(game.createdAt)
													.toLocaleTimeString()
													.slice(0, -3)}
											</div>
										</h5>
									</div>
									<div
										className="grid column"
										style={{ padding: 8 }}
									>
										<h5 className="ui tiny icon header">
											<i className="hourglass half sub fitted icon"></i>
											<div className="sub text content">
												{getGameStateString(game.state)}
											</div>
										</h5>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Card>
			</Modal>
		);
	}
	return null;
};

export default withRouter(GameModal);
