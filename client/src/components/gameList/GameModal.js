import React, { useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import { Modal } from "semantic-ui-react";

import { UserContext } from "context";
import { getGameStateString, getGameStateIcon, getTimeSinceUpdated } from "util/index";
import Card from "../Card";

import "./gameModal.css";

const GameModal = ({ history, open, setOpen, game, setGame, joinGame, deleteGame }) => {
	const { user } = useContext(UserContext);
	const [active, setActive] = useState("");

	const checkIfPlaying = () => {
		if (!user) {
			return false;
		} else if (game.whitePlayer._user && game.whitePlayer._user.id === user.id) {
			return Boolean(game.whitePlayer);
		} else if (game.blackPlayer._user && game.blackPlayer._user.id === user.id) {
			return Boolean(game.blackPlayer);
		} else {
			return false;
		}
	};

	const onClose = () => {
		setOpen(false);
		setGame(null);
	};

	const onWatch = () => {
		history.push(`/game/${game.id}`);
	};

	const onJoin = async () => {
		if (user && user.setUp && !checkIfPlaying()) {
			try {
				setActive("active");
				await joinGame(game.id);
				setActive("");
				history.push(`/game/${game.id}`);
			} catch (e) {
				console.error(e);
				setActive("");
			}
		}
	};

	const onDelete = async () => {
		try {
			setActive("active");
			await deleteGame(game.id);
			setActive("");
			setOpen(false);
		} catch (e) {
			console.error(e);
			setActive("");
		}
	};

	const renderPlayer = playerField => {
		const player = game[playerField];
		const playing = checkIfPlaying();
		const color = player.color === "w" ? "White" : "Black";

		const cursor = user && user.setUp && !player._user && !playing ? "clickable" : "";
		const onClick = player._user ? null : () => onJoin();

		const renderIcon = () => {
			if (player._user) {
				return (
					<div className="flex center">
						<img
							src={`/${player._user.icon}`}
							className="ui circular image"
							alt=""
						/>
					</div>
				);
			} else if (!user || !user.setUp || playing) {
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
			} else if (!user || !user.setUp || playing) {
				return <div style={{ color: "gray" }}>$#*?@</div>;
			}
			return <div>Join</div>;
		};

		return (
			<div className={`grid seven wide column ${player.color}`}>
				<h2 className={`ui icon header ${cursor}`} onClick={onClick}>
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
		const toGameButtonIcon = checkIfPlaying() ? "play" : "eye";
		const toGameButtonDisabled = !game.whitePlayer._user || !game.blackPlayer._user;
		const deleteButtonDisabled =
			!user ||
			(!user.superAdmin && (game.host !== user.id || game.state !== "NEW"));

		return (
			<Modal
				closeOnDimmerClick
				basic
				onClose={onClose}
				open={open}
				className="game-modal game modal"
			>
				<Card className="game modal">
					<div className="content" style={{ position: "relative" }}>
						<div className={`ui ${active} inverted dimmer`}>
							<div className="ui loader"></div>
						</div>
						<div className="ui center aligned main grid">
							<div className="grid first row">
								<h2 className="ui header">
									<i className="hashtag big icon"></i>
									<div className="content">{`${game.gameId}`}</div>
								</h2>
							</div>
							<div className="ui first divider"></div>
							<div className="grid equal width center aligned second row">
								<div className="grid column zero padding">
									<div className="ui buttons">
										<button
											className="ui basic compact button"
											onClick={onWatch}
											disabled={toGameButtonDisabled}
										>
											<i className={`${toGameButtonIcon} icon`}></i>
											<span>To game</span>
										</button>

										<button
											className="ui basic compact button"
											onClick={onDelete}
											disabled={deleteButtonDisabled}
										>
											<i className="trash alternate outline icon"></i>
											<span>Delete</span>
										</button>
									</div>
								</div>
							</div>
							<div className="ui second divider"></div>
							<div className="grid three column center aligned third row ">
								{renderPlayer("whitePlayer")}
								<div className="grid two wide column zero padding">
									<div className="ui vertical divider">VS</div>
								</div>
								{renderPlayer("blackPlayer")}
							</div>
							<div className="ui third divider"></div>
							<div className="ui center aligned internally celled sub grid">
								<div className="grid three column fourth row">
									<div className="grid column">
										<h5 className="ui tiny icon header">
											<i className="calendar sub fitted icon"></i>
											<div className="sub text content">
												{new Date(
													game.createdAt
												).toLocaleDateString()}
											</div>
										</h5>
									</div>
									<div className="grid column">
										<h5 className="ui tiny icon header">
											<i className="clock sub fitted icon"></i>
											<div className="sub text content">
												{getTimeSinceUpdated(game.lastUpdated)}
											</div>
										</h5>
									</div>
									<div className="grid column">
										<h5 className="ui tiny icon header">
											<i
												className={`${getGameStateIcon(
													game.state
												)} sub fitted icon`}
											></i>
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
