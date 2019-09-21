import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import GameCard from "./GameCard";
import useWindowDimentions from "../util/useWindowsDimensions";

import Chess from "chess.js";
import Menu from "./Menu";
import Footer from "./Footer";
import Home from "./Home";
import ChessGameController from "./chessGame/ChessGameController";
const chess = new Chess();
const chess2 = new Chess();
chess2.move("a3");

const game1 = {
	id: 533,
	date: new Date(),
	whitePlayer: { name: "Sabrina", icon: "kristy.png" },
	blackPlayer: { name: "Loris", host: true, icon: "daniel.jpg" },
	moves: chess.history(),
	fen: chess2.fen()
};

const game2 = {
	id: 2,
	date: new Date(),
	whitePlayer: { name: "Loris", host: true, icon: "daniel.jpg" },
	blackPlayer: { name: "Mark", icon: "matthew.png" },
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

const App = () => {
	const { height } = useWindowDimentions();
	return (
		<BrowserRouter>
			<Menu />
			<div
				className="ui container centered background"
				style={{ height: height - 92 }}
			>
				<Route exact path="/" render={() => <Home />} />
				<Route exact path="/games" render={() => <GameList />} />
				<Route
					path="/games/:id"
					render={() => <ChessGameController />}
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
