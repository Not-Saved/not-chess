import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import { Modal } from "semantic-ui-react";

import { UserContext } from "context";
import { getGameStateString } from "../../util";
import Card from "../Card";
import "../../styles/gameModal.css";

const GameModal = ({ history, open, setOpen, game, setGame, joinGame }) => {
	const { user } = useContext(UserContext);

	const onClose = () => {
		setOpen(false);
		setGame(null);
	};
	const onWatch = e => {
		e.stopPropagation();
		history.push(`/game/${game.id}`);
	};
	const onJoin = async () => {
		if (user && user.setUp) {
			await joinGame(game.id);
			history.push(`/game/${game.id}`);
		}
	};

	const renderPlayer = playerField => {
		const player = game[playerField];
		const color = player.color === "w" ? "White" : "Black";
		const padding =
			player.color === "w" ? "0px 0px 0px 5%" : "0px 5% 0px 0px";
		const cursor = user && user.setUp ? "pointer" : "";

		const renderIcon = () => {
			if (player._user) {
				return (
					<div
						className="player icon"
						style={{
							display: "flex",
							justifyContent: "center"
						}}
					>
						<img
							src={`/${player._user.icon}`}
							className="ui circular image"
							alt={""}
						/>
					</div>
				);
			} else if (!user || !user.setUp) {
				return (
					<div className="icon container">
						<i className="grey user circle fitted player icon"></i>
					</div>
				);
			} else {
				return (
					<div className="icon container">
						<i className="plus circle fitted player icon"></i>
					</div>
				);
			}
		};

		const renderText = () => {
			if (player._user) {
				return player._user.userName;
			} else if (!user || !user.setUp) {
				return <div style={{ color: "gray" }}>$#*?@</div>;
			}
			return <div>Join</div>;
		};

		return (
			<div className="grid seven wide column" style={{ padding }}>
				<h2
					className="ui icon header"
					onClick={() => onJoin(player.color)}
					style={{ cursor }}
				>
					{renderIcon()}
					<div className="content">
						{renderText()}
						<div className="sub header">{color}</div>
					</div>
				</h2>
			</div>
		);
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
								{renderPlayer("whitePlayer")}
								<div
									className="grid two wide column"
									style={{ padding: 0 }}
								>
									<div className="ui vertical divider">
										VS
									</div>
								</div>
								{renderPlayer("blackPlayer")}
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
