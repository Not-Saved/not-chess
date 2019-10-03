import React, { useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import { Modal } from "semantic-ui-react";

import { UserContext } from "context";
import {
	getGameStateString,
	getGameStateIcon,
	getTimeSinceUpdated
} from "../../util";
import Card from "../Card";
import "../../styles/gameModal.css";

const GameModal = ({
	history,
	open,
	setOpen,
	game,
	setGame,
	joinGame,
	deleteGame
}) => {
	const { user } = useContext(UserContext);
	const [active, setActive] = useState("");

	const checkIfPlaying = () => {
		let player = null;
		if (!user) return Boolean(player);
		if (game.whitePlayer._user && game.whitePlayer._user.id === user.id)
			player = game.whitePlayer;
		if (game.blackPlayer._user && game.blackPlayer._user.id === user.id)
			player = game.blackPlayer;
		return Boolean(player);
	};

	const onClose = () => {
		setOpen(false);
		setGame(null);
	};
	const onWatch = e => {
		e.stopPropagation();
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
				setActive("");
				console.log(e);
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
			setActive("");
			console.log(e);
		}
	};

	const renderPlayer = playerField => {
		const player = game[playerField];
		const playing = checkIfPlaying();
		const color = player.color === "w" ? "White" : "Black";
		const padding =
			player.color === "w" ? "0px 0px 0px 5%" : "0px 5% 0px 0px";
		const cursor =
			user && user.setUp && !player._user && !playing ? "pointer" : "";
		const onClick = player._user ? null : () => onJoin();

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
			<div className="grid seven wide column" style={{ padding }}>
				<h2
					className="ui icon header"
					onClick={onClick}
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
							className={`ui ${active} inverted dimmer`}
							style={{ padding: 25 }}
						>
							<div className="ui loader"></div>
						</div>
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
								className="grid equal width row"
								style={{ padding: "0px 6vw" }}
							>
								<div className="grid column zero-padding">
									<div
										className="ui buttons"
										style={{ width: "100%" }}
									>
										<button
											className="ui basic compact button"
											onClick={onWatch}
											style={{
												width: "50%",
												padding: "5px 10px"
											}}
											disabled={
												!game.whitePlayer._user ||
												!game.blackPlayer._user
											}
										>
											<i
												className={`${
													checkIfPlaying()
														? "play"
														: "eye"
												} icon`}
											></i>
											<span
												style={{ fontWeight: "bold" }}
											>
												To game
											</span>
										</button>

										<button
											className="ui basic compact button"
											style={{
												width: "50%",
												padding: "5px 10px"
											}}
											onClick={onDelete}
											disabled={
												!user ||
												(!user.superAdmin &&
													(game.host !== user.id ||
														game.state !== "NEW"))
											}
										>
											<i className="trash alternate outline icon"></i>
											<span
												style={{
													fontWeight: "bold"
												}}
											>
												Delete
											</span>
										</button>
									</div>
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
										style={{ padding: "7px 8px 0px 8px" }}
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
										style={{ padding: "7px 8px 0px 8px" }}
									>
										<h5 className="ui tiny icon header">
											<i className="clock sub fitted icon"></i>
											<div className="sub text content">
												{getTimeSinceUpdated(
													game.lastUpdated
												)}
											</div>
										</h5>
									</div>
									<div
										className="grid column"
										style={{ padding: "7px 8px 0px 8px" }}
									>
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
