import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import ChessBoard from "./ChessBoard";
import GameCard from "./GameCard";

import Chess from "chess.js";
import Menu from "./Menu";
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
			style={{ paddingTop: "10px" }}
		>
			<BrowserRouter>
				<Menu />
				<Route exact path="/" component={GameList} />
				<Route
					path="/chess"
					render={() => <ChessBoard game={chess} />}
				/>
			</BrowserRouter>
		</div>
	);
};

const GameList = props => {
	return (
		<div className="scrolling" style={{ maxHeight: "704px" }}>
			<div>
				<GameCard game={game1} />
				<GameCard game={game2} />
				<GameCard game={game3} />
				<GameCard game={game3} />
			</div>
		</div>
	);
};

export default App;
