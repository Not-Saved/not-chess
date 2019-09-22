import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import useWindowDimentions from "../util/useWindowsDimensions";

import Menu from "./Menu";
import Footer from "./Footer";
import Home from "./Home";
import GameListController from "./gameList/GameListController";
import ChessGameController from "./chessGame/ChessGameController";

const App = () => {
	const { height, width } = useWindowDimentions();
	return (
		<BrowserRouter>
			<Menu />
			<div
				className={`ui  ${width > 480 ? "container" : ""} background`}
				style={{ height: height - 92 }}
			>
				<Route exact path="/" render={() => <Home />} />
				<Route
					exact
					path="/games"
					render={() => <GameListController />}
				/>
				<Route
					path="/games/:id"
					render={() => <ChessGameController />}
				/>
			</div>
			<Footer />
		</BrowserRouter>
	);
};

export default App;
