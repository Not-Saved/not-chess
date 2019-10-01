import React, { useContext } from "react";

import { UserContext } from "context";
import GameCard from "./GameCard";
import useWindowDimentions from "../../util/useWindowsDimensions";

const GameList = ({ games, openModal }) => {
	const { height } = useWindowDimentions();
	const { user } = useContext(UserContext);

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
						user={user}
						onClick={e => openModal(e, game)}
					/>
				))}
			</div>
		</div>
	);
};

export default GameList;
