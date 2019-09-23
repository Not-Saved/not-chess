import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import useWindowDimentions from "../util/useWindowsDimensions";

import Menu from "./Menu";
import Footer from "./Footer";
import Home from "./Home";
import Login from "./Login";

import GameListController from "./gameList/GameListController";
import ChessGameController from "./chessGame/ChessGameController";
import useCurrentUser from "../util/useCurrentUser";
import { UserContext } from "context";

const App = () => {
	const [userChecked, setUserChecked] = useState(false);
	const { user, postUser, getUser, logout } = useCurrentUser();
	const { height, width } = useWindowDimentions();

	useEffect(() => {
		(async function() {
			await getUser();
			setUserChecked(true);
		})();
	}, [getUser]);

	if (!userChecked) return null;
	return (
		<UserContext.Provider value={{ user, postUser, getUser, logout }}>
			<BrowserRouter>
				<Menu />
				<div
					className={`ui  ${
						width > 480 ? "container" : ""
					} background`}
					style={{ height: height - 92 }}
				>
					<Route exact path="/" render={() => <Home />} />
					<Route exact path="/login" render={() => <Login />} />
					<Route
						exact
						path="/games"
						render={() => <GameListController />}
					/>
					<Route
						path="/game/:id"
						render={() => <ChessGameController />}
					/>
				</div>
				<Footer />
			</BrowserRouter>
		</UserContext.Provider>
	);
};

export default App;
