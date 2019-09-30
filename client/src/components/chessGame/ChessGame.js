import React from "react";
import Chess from "chess.js";

import ChessBoard from "./ChessBoard";
import Player from "./Player";
import "../../styles/chessGame.css";

const ChessGame = ({
	game,
	playerField = "whitePlayer",
	playingColor,
	...rest
}) => {
	const chessJsGame = new Chess(game.fen);
	const renderCorners = () => {
		const otherPlayerField =
			playerField === "whitePlayer" ? "blackPlayer" : "whitePlayer";
		return (
			<>
				<div className="top left">
					<Player
						player={game[otherPlayerField]}
						playerField={otherPlayerField}
						turn={chessJsGame.turn()}
						winner={game.winner}
						position="up"
					/>
				</div>
				<div className="bottom right">
					<Player
						player={game[playerField]}
						playerField={playerField}
						turn={chessJsGame.turn()}
						winner={game.winner}
						position="down"
					/>
				</div>
				<i
					className="top right grey eye fitted icon"
					style={{ visibility: playingColor ? "hidden" : "visible" }}
				></i>
			</>
		);
	};

	return (
		<div
			style={{ height: "100%", position: "relative" }}
			className="chess-game"
		>
			{renderCorners()}
			<div style={{ height: "100%" }} className="animate">
				<ChessBoard
					chessJsGame={chessJsGame}
					playerField={playerField}
					playingColor={playingColor}
					{...rest}
				/>
			</div>
		</div>
	);
};

export default ChessGame;
