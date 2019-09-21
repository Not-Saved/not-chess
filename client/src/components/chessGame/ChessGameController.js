import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Chess from "chess.js";

import ChessGame from "./ChessGame";

const ChessGameController = ({ location: { state: game } }) => {
	const [chessJsGame, setChessJsGame] = useState(null);
	const [playingColor, setPlayingColor] = useState("");

	useEffect(() => {
		if (game) setChessJsGame(new Chess(game.fen));
		setPlayingColor("w");
	}, [game]);

	useEffect(() => {
		if (chessJsGame && chessJsGame.turn() !== playingColor) {
			const newChessJsGame = new Chess(chessJsGame.fen());
			const moves = newChessJsGame.moves();
			const move = moves[Math.floor(Math.random() * moves.length)];
			newChessJsGame.move(move);
			setTimeout(() => setChessJsGame(newChessJsGame), 250);
		}
	}, [chessJsGame, playingColor]);

	if (chessJsGame) {
		return (
			<ChessGame
				game={game}
				chessJsGame={chessJsGame}
				setChessJsGame={setChessJsGame}
				playerField="whitePlayer"
				playingColor={playingColor}
			/>
		);
	}
	return null;
};

export default withRouter(ChessGameController);
