import React, { useContext } from "react";

import { UserContext } from "context";
import Footer from "components/Footer";
import GameFilter from "./GameFilter";

import "./gameListFooter.css";

const GameListFooter = ({ setOpen, ...rest }) => {
	const { user } = useContext(UserContext);

	const newGameVisible = user && user.setUp ? "visible" : "hidden";

	return (
		<Footer style={{ zIndex: 12 }}>
			<div className="ui container centered game list footer full height">
				<div className="grid">
					<div className="left item">
						<GameFilter {...rest} />
					</div>
					<div className="right item" style={{ visibility: newGameVisible }}>
						<button
							className="ui basic compact fluid button"
							onClick={() => setOpen(true)}
						>
							<i className="plus icon"></i>
							New Game
						</button>
					</div>
				</div>
			</div>
		</Footer>
	);
};

export default GameListFooter;
