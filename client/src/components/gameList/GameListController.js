import React, { useState } from "react";
import Chess from "chess.js";

import GameList from "./GameList";
import GameModal from "./GameModal";

const GameListController = props => {
	const [open, setOpen] = useState(false);
	const [selectedGame, setSelectedGame] = useState(null);

	const openModal = (e, game) => {
		setSelectedGame(game);
		setOpen(true);
	};

	return (
		<>
			<GameModal
				open={open}
				setOpen={setOpen}
				game={selectedGame}
				setGame={setSelectedGame}
			/>
			<GameList games={games} openModal={openModal} />
		</>
	);
};

export default GameListController;

const chess = new Chess();
const chess2 = new Chess();
chess2.move("e3");
chess2.move("f6");
chess2.move("a3");
chess2.move("f5");
chess2.move("a4");
chess2.move("g5");
chess2.move({ from: "d1", to: "h5" });

const game1 = {
	id: 533,
	date: new Date(),
	whitePlayer: { name: "Sabrina", icon: "elyse.png", color: "w" },
	blackPlayer: { name: "Loris", host: true, icon: "daniel.jpg", color: "b" },
	moves: chess.history(),
	fen: chess2.fen(),
	winner: { name: "Sabrina", icon: "elyse.png", color: "w" },
	state: "CHECKMATE"
};

const game2 = {
	id: 2,
	date: new Date(),
	whitePlayer: { name: "Loris", host: true, icon: "daniel.jpg", color: "w" },
	blackPlayer: {},
	moves: chess.history(),
	fen: chess.fen(),
	state: "NEW"
};

const game3 = {
	id: 2,
	date: new Date(),
	whitePlayer: { name: "Tom", host: true, icon: "patrick.png", color: "w" },
	blackPlayer: { name: "Mark", icon: "matthew.png", color: "b" },
	moves: chess.history(),
	fen: chess.fen(),
	state: "IN_PROGRESS"
};

const games = [game1, game2, game3, game2, game3, game2];
