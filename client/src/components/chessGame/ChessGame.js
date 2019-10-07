import React from "react";
import Chess from "chess.js";
import { Sidebar } from "semantic-ui-react";

import ChessBoard from "./ChessBoard";
import Player from "./Player";
import "./chessGame.css";

const ChessGame = ({
	game,
	playerField = "whitePlayer",
	playingColor,
	active,
	sidebarOpen,
	setSidebarOpen,
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

	const renderLoader = () => {
		return (
			<div
				className={`ui ${active} dimmer`}
				style={{ zIndex: 9, backgroundColor: "#00000000" }}
			>
				<div className="ui big loader"></div>
			</div>
		);
	};

	return (
		<Sidebar.Pushable>
			<Sidebar
				animation="overlay"
				direction="right"
				icon="labeled"
				onHide={() => setSidebarOpen(false)}
				visible={sidebarOpen}
				width="thin"
				style={{ backgroundColor: "rgba(0,0,0,0.95)" }}
			>
				{game.moves.map(move => {
					return (
						<div key={move.san} style={{ color: "white" }}>
							{move.san}
						</div>
					);
				})}
			</Sidebar>

			<Sidebar.Pusher
				dimmed={sidebarOpen}
				style={{ height: "100%" }}
				className="chess-game"
			>
				<div style={{ height: "100%" }}>
					{renderCorners()}
					<div style={{ height: "100%" }}>
						{renderLoader()}
						<ChessBoard
							chessJsGame={chessJsGame}
							playerField={playerField}
							playingColor={playingColor}
							{...rest}
						/>
					</div>
				</div>
			</Sidebar.Pusher>
		</Sidebar.Pushable>
	);
};

export default ChessGame;
