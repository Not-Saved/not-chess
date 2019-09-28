import React from "react";
import ChessBoard from "./ChessBoard";

import "../../styles/chessGame.css";
import Player from "./Player";

const ChessGame = ({
	game,
	chessJsGame,
	setChessJsGame,
	playerField = "whitePlayer",
	playingColor
}) => {
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
					setChessJsGame={setChessJsGame}
					playerField={playerField}
					playingColor={playingColor}
				/>
			</div>
		</div>
	);
};

export default ChessGame;
