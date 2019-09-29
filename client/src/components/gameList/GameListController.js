import React, { useState } from "react";

import GameList from "./GameList";
import GameModal from "./GameModal";
import GameListFooter from "./GameListFooter";
import NewGameModal from "./NewGameModal";
import useGames from "util/useGames";
import Loading from "components/Loading";
import Empty from "./Empty";

const GameListController = props => {
	const { games, postGame, joinGame, gameState, setGameState } = useGames();
	const [open, setOpen] = useState(false);
	const [openNew, setOpenNew] = useState(false);
	const [selectedGame, setSelectedGame] = useState(null);

	const openModal = (e, game) => {
		setSelectedGame(game);
		setOpen(true);
	};

	const renderGames = () => {
		if (games && games.length) {
			return <GameList games={games} openModal={openModal} />;
		}
		if (games && !games.length) {
			return <Empty />;
		}
		return <Loading />;
	};

	return (
		<>
			<GameModal
				open={open}
				setOpen={setOpen}
				game={selectedGame}
				setGame={setSelectedGame}
				joinGame={joinGame}
			/>
			<NewGameModal
				open={openNew}
				setOpen={setOpenNew}
				postGame={postGame}
			/>
			{renderGames()}
			<GameListFooter
				setOpen={setOpenNew}
				gameState={gameState}
				setGameState={setGameState}
			/>
		</>
	);
};

export default GameListController;
