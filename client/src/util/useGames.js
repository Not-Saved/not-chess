import { useState, useCallback, useEffect } from "react";
import { notChess } from "../api";

export default function useGames(initGameState = [], initMine = false) {
	const [games, setGames] = useState(null);
	const [gameState, setGameState] = useState(initGameState);
	const [mine, setMine] = useState(initMine);

	const getGames = useCallback(async () => {
		setGames(null);
		const response = await notChess({
			method: "get",
			url: "/games",
			params: { state: gameState, mine: mine }
		});
		setGames(response.data);
	}, [gameState, mine]);

	const postGame = useCallback(
		async color => {
			await notChess({
				method: "post",
				url: "/games",
				params: { color }
			});
			await getGames();
		},
		[getGames]
	);

	const joinGame = useCallback(
		async id => {
			await notChess({
				method: "post",
				url: `/games/${id}`
			});
			await getGames();
		},
		[getGames]
	);

	useEffect(() => {
		getGames();
	}, [getGames]);

	return {
		games,
		getGames,
		postGame,
		joinGame,
		gameState,
		setGameState,
		mine,
		setMine
	};
}
