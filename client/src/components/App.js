import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import GameCard from "./GameCard";
import useWindowDimentions from "../util/useWindowsDimensions";

import Chess from "chess.js";
import Menu from "./Menu";
import Footer from "./Footer";
import ChessGame from "./ChessGame";
const chess = new Chess();
const chess2 = new Chess();
chess2.move("a3");

const game1 = {
	id: 533,
	date: new Date(),
	whitePlayer: { name: "Sabrina" },
	blackPlayer: { name: "Loris", host: true },
	moves: chess.history(),
	fen: chess2.fen()
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
	const { height } = useWindowDimentions();
	return (
		<BrowserRouter>
			<Menu />
			<div
				className="ui container centered background"
				style={{ height: height - 92 }}
			>
				<Route exact path="/" render={() => <GameList />} />
				<Route exact path="/my-games" render={() => <GameList />} />
				<Route
					path="/chess/:id"
					render={() => <ChessGame game={chess} />}
				/>
			</div>
			<Footer />
		</BrowserRouter>
	);
};

const GameList = props => {
	const { height } = useWindowDimentions();
	return (
		<>
			<div
				className="ui container centered text scrolling"
				style={{ maxHeight: height - 94 }}
			>
				<GameCard game={game1} />
				<GameCard game={game2} />
				<GameCard game={game3} />
				<GameCard game={game3} />
				<GameCard game={game3} />
				<GameCard game={game3} />
				<GameCard game={game3} />
				<GameCard game={game2} />
				<GameCard game={game1} />
				<GameCard game={game3} />
			</div>
		</>
	);
};

export default App;
