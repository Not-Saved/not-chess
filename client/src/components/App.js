import React from "react";
import { HashRouter, Route } from "react-router-dom";
import ChessBoard from "./ChessBoard";
import GameCard from "./GameCard";

import Chess from "chess.js";
const chess = new Chess();

const game1 = {
	id: 533,
	date: new Date(),
	whitePlayer: { name: "Sabrina" },
	blackPlayer: { name: "Loris", host: true },
	moves: chess.history(),
	fen: chess.fen()
};

const game2 = {
	id: 2,
	date: new Date(),
	whitePlayer: { name: "Loris", host: true },
	blackPlayer: { name: "Mark" },
	moves: chess.history(),
	fen: chess.fen()
};

const game3 = {
	id: 2,
	date: new Date(),
	whitePlayer: { name: "Tom", host: true },
	blackPlayer: { name: "Mark" },
	moves: chess.history(),
	fen: chess.fen()
};

const App = () => {
	return (
		<div
			className="ui container centered text"
			style={{ paddingTop: "20px" }}
		>
			<HashRouter>
				<Route exact path="/" component={GameList} />
				<Route
					exact
					path="/chess"
					render={() => <ChessBoard game={chess} />}
				/>
			</HashRouter>
		</div>
	);
};

const GameList = props => {
	return (
		<>
			<GameCard game={game1} />
			<GameCard game={game2} />
			<GameCard game={game3} />
			<GameCard game={game1} />
		</>
	);
};

export default App;
