import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Chess from "chess.js";

import ChessGame from "./ChessGame";
import WinModal from "./WinModal";

const ChessGameController = ({ location: { state: game } }) => {
	const [winner, setWinner] = useState(null);
	const [chessJsGame, setChessJsGame] = useState(null);
	const [playingColor, setPlayingColor] = useState("");

	useEffect(() => {
		if (game) setChessJsGame(new Chess(game.fen));
		setPlayingColor("w");
	}, [game]);

	useEffect(() => {
		if (chessJsGame) {
			const newChessJsGame = new Chess(chessJsGame.fen());
			if (newChessJsGame.game_over()) {
				const player =
					newChessJsGame.turn === "b" ? "blackPlayer" : "whitePlayer";
				setWinner(player);
				return;
			}
			if (chessJsGame.turn() !== playingColor) {
				const moves = newChessJsGame.moves();
				const move = moves[Math.floor(Math.random() * moves.length)];
				newChessJsGame.move(move);
				console.log(chessJsGame);
				setTimeout(() => setChessJsGame(newChessJsGame), 250);
			}
		}
	}, [chessJsGame, playingColor]);

	if (chessJsGame) {
		return (
			<>
				<WinModal
					open={Boolean(winner)}
					setOpen={setWinner}
					game={game}
					winner={winner}
				/>
				<ChessGame
					game={game}
					chessJsGame={chessJsGame}
					setChessJsGame={setChessJsGame}
					playerField="whitePlayer"
					playingColor={playingColor}
				/>
			</>
		);
	}
	return null;
};

export default withRouter(ChessGameController);
