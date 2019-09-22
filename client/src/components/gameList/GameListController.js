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
chess2.move("a3");

const game1 = {
	id: 533,
	date: new Date(),
	whitePlayer: {},
	blackPlayer: { name: "Loris", host: true, icon: "daniel.jpg" },
	moves: chess.history(),
	fen: chess2.fen()
};

const game2 = {
	id: 2,
	date: new Date(),
	whitePlayer: { name: "Loris", host: true, icon: "daniel.jpg" },
	blackPlayer: {},
	moves: chess.history(),
	fen: chess.fen()
};

const game3 = {
	id: 2,
	date: new Date(),
	whitePlayer: { name: "Tom", host: true, icon: "patrick.png" },
	blackPlayer: { name: "Mark", icon: "matthew.png" },
	moves: chess.history(),
	fen: chess.fen()
};

const games = [game1, game2, game3, game2, game3, game2];
