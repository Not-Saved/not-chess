import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import useWindowDimentions from "../util/useWindowsDimensions";

import Menu from "./Menu";
import Footer from "./Footer";
import Home from "./Home";
import Login from "./Login";
import GameListController from "./gameList/GameListController";
import ChessGameController from "./chessGame/ChessGameController";

import { UserContext } from "context";
import useCurrentUser from "../util/useCurrentUser";
import UserSetupController from "./user/UserSetupController";

const App = () => {
	const [userChecked, setUserChecked] = useState(false);
	const { user, postUser, getUser, logout, validateUser } = useCurrentUser();
	const { height, width } = useWindowDimentions();

	useEffect(() => {
		(async function() {
			await getUser();
			setUserChecked(true);
		})();
	}, [getUser]);

	if (!userChecked) return null;
	return (
		<UserContext.Provider
			value={{ user, postUser, getUser, logout, validateUser }}
		>
			<BrowserRouter>
				<Menu />
				<div
					className={`ui ${
						width > 480 ? "container" : ""
					} background`}
					style={{
						height: height,
						paddingBottom: 40,
						paddingTop: 50
					}}
				>
					<Route exact path="/" render={() => <Home />} />
					<Route exact path="/login" render={() => <Login />} />
					<Route
						exact
						path="/user/settings"
						render={() => <UserSetupController />}
					/>
					<Route
						exact
						path="/games"
						render={() => <GameListController />}
					/>
					<Route
						path="/game/:id"
						render={() => <ChessGameController />}
					/>
					<Footer />
				</div>
			</BrowserRouter>
		</UserContext.Provider>
	);
};

export default App;
