import React from "react";

import GameCard from "./GameCard";
import useWindowDimentions from "../../util/useWindowsDimensions";

const GameList = ({ games, openModal }) => {
	const { height } = useWindowDimentions();
	return (
		<>
			<div
				className="ui container centered text scrolling"
				style={{ maxHeight: height - 94 }}
			>
				{games.map((game, idx) => (
					<GameCard
						key={idx}
						game={game}
						onClick={e => openModal(e, game)}
					/>
				))}
			</div>
		</>
	);
};

export default GameList;
