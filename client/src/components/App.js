import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { UserContext } from "context";
import useCurrentUser from "../util/useCurrentUser";
import useWindowDimentions from "../util/useWindowsDimensions";

import Loading from "./Loading";
import Menu from "./menu/Menu";
import Footer from "./Footer";
import Home from "./Home";
import Login from "./Login";
import GameListController from "./gameList/GameListController";
import ChessGameController from "./chessGame/ChessGameController";
import UserSetupController from "./user/UserSetupController";

import "./app.css";

const App = () => {
	const { user, postUser, getUser, logout, validateUser } = useCurrentUser();
	const { height, width } = useWindowDimentions();
	const [userChecked, setUserChecked] = useState(false);

	useEffect(() => {
		(async function() {
			await getUser();
			setUserChecked(true);
		})();
	}, [getUser]);

	const containerClassName = width > 480 ? "ui container" : "";

	if (!userChecked)
		return (
			<div className="window height background">
				<Loading />
			</div>
		);
	return (
		<BrowserRouter>
			<UserContext.Provider
				value={{ user, postUser, getUser, logout, validateUser }}
			>
				<Menu />
				<div
					className={`app background ${containerClassName}`}
					style={{ height }}
				>
					<Route exact path="/" render={() => <Home />} />
					<Route path="/login" render={() => <Login />} />
					<Route path="/user/settings" render={() => <UserSetupController />} />
					<Route path="/games" render={() => <GameListController />} />
					<Route path="/game/:id" render={() => <ChessGameController />} />
				</div>
				<Footer />
			</UserContext.Provider>
		</BrowserRouter>
	);
};

export default App;
