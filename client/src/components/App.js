import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { UserContext } from "context";
import useCurrentUser from "../util/useCurrentUser";
import useWindowDimentions from "../util/useWindowsDimensions";

import Loading from "./Loading";
import Menu from "./menu/Menu";
import Footer from "./Footer";
import Empty from "./gameList/Empty";

import "./app.css";

const Home = React.lazy(() => import("./Home"));
const Login = React.lazy(() => import("./Login"));
const GameListController = React.lazy(() => import("./gameList/GameListController"));
const ChessGameController = React.lazy(() => import("./chessGame/ChessGameController"));
const UserSetupController = React.lazy(() => import("./user/UserSetupController"));
const UserListController = React.lazy(() => import("./userList/UserListController"));

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

	function renderMainContent() {
		return (
			<>
				<Menu />
				<div
					className={`app background ${containerClassName}`}
					style={{ height }}
				>
					<Suspense fallback={<Loading />}>
						<Switch>
							<Route exact path="/" render={() => <Home />} />
							<Route path="/login" render={() => <Login />} />
							<Route
								path="/user/settings"
								render={() => <UserSetupController />}
							/>
							<Route path="/games" render={() => <GameListController />} />
							<Route
								path="/game/:id"
								render={() => <ChessGameController />}
							/>
							<Route
								path="/leaderboard"
								render={() => <UserListController />}
							/>
							<Route render={() => <Empty />} />
						</Switch>
					</Suspense>
				</div>
				<Footer />
			</>
		);
	}

	function renderFullscreenLoading() {
		return (
			<div className="app window height background">
				<Loading />
			</div>
		);
	}

	const containerClassName = width > 480 ? "ui container" : "";

	if (!userChecked) {
		return renderFullscreenLoading();
	} else {
		return (
			<UserContext.Provider
				value={{ user, postUser, getUser, logout, validateUser }}
			>
				<BrowserRouter>
					<Switch>
						<Route path="/auth" render={renderFullscreenLoading} />
						<Route render={renderMainContent} />
					</Switch>
				</BrowserRouter>
			</UserContext.Provider>
		);
	}
};

export default App;
