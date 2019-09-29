import React from "react";

import Footer from "components/Footer";
import GameFilter from "./GameFilter";
import "styles/gameListFooter.css";

const GameListFooter = ({ setOpen, gameState, setGameState }) => {
	return (
		<Footer style={{ zIndex: 12 }}>
			<div
				className="ui container centered game list footer"
				style={{ height: "100%" }}
			>
				<div className="grid">
					<div className="left item">
						<GameFilter
							setGameState={setGameState}
							gameState={gameState}
						/>
					</div>
					<div className="right item">
						<button
							className="ui basic compact fluid button"
							onClick={() => setOpen(true)}
						>
							<i
								className="plus icon"
								style={{ paddingRight: 15 }}
							></i>
							<span style={{ fontWeight: "bold" }}>New Game</span>
						</button>
					</div>
				</div>
			</div>
		</Footer>
	);
};

export default GameListFooter;
