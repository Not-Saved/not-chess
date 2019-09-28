import React from "react";

import GameCard from "./GameCard";
import useWindowDimentions from "../../util/useWindowsDimensions";

const GameList = ({ games, openModal }) => {
	const { height } = useWindowDimentions();
	return (
		<div className="top50">
			<div
				className="ui container centered text scrolling"
				style={{ maxHeight: height - 92 }}
			>
				{games.map((game, idx) => (
					<GameCard
						key={idx}
						game={game}
						onClick={e => openModal(e, game)}
					/>
				))}
			</div>
		</div>
	);
};

export default GameList;
