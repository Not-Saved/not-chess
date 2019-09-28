import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Chess from "chess.js";

import ChessGame from "./ChessGame";
import WinModal from "./WinModal";
import ChessGameFooter from "./ChessGameFooter";

const ChessGameController = ({ location: { state } }) => {
	const [winner, setWinner] = useState(null);
	const [winOpen, setWinOpen] = useState(false);
	const [game, setGame] = useState(state);
	const [chessJsGame, setChessJsGame] = useState(null);
	const [playingColor, setPlayingColor] = useState("");

	useEffect(() => {
		if (game) setChessJsGame(new Chess(game.fen));
		setPlayingColor("");
	}, [game]);

	useEffect(() => {
		if (chessJsGame) {
			const newChessJsGame = new Chess(chessJsGame.fen());
			if (chessJsGame.in_checkmate() && !winner) {
				const winnerColor =
					newChessJsGame.turn() === "w"
						? "blackPlayer"
						: "whitePlayer";
				setGame({ ...game, winner: game[winnerColor] });
				setWinner(game[winnerColor]);
				setWinOpen(true);
			} else if (newChessJsGame.turn() !== playingColor && !winner) {
				const moves = newChessJsGame.moves();
				const move = moves[Math.floor(Math.random() * moves.length)];
				newChessJsGame.move(move);
				setTimeout(() => setChessJsGame(newChessJsGame), 250);
			}
		}
	}, [chessJsGame, playingColor, game, winner]);

	if (chessJsGame) {
		return (
			<>
				<WinModal
					open={winOpen}
					setOpen={setWinOpen}
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

				<ChessGameFooter />
			</>
		);
	}
	return null;
};

export default withRouter(ChessGameController);
