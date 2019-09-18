import React from "react";
import { withRouter } from "react-router-dom";
import Chess from "chess.js";

import ChessBoard from "./ChessBoard";

import "../styles/chessGame.css";

const ChessGame = ({ location: { state: game } }) => {
	const chessJsGame = new Chess(game.fen);

	const renderCorners = () => {
		return (
			<>
				<div className="top left angle">
					<i class="user circle icon"></i>
					<span class="text">{game.whitePlayer.name}</span>
				</div>
				<div className="bottom right angle">
					<span class="text">{game.blackPlayer.name}</span>
					<i class="user circle icon"></i>
				</div>
			</>
		);
	};

	return (
		<div
			style={{ height: "100%", position: "relative" }}
			className="chess-game"
		>
			{renderCorners()}
			<ChessBoard game={chessJsGame} />
		</div>
	);
};

export default withRouter(ChessGame);
