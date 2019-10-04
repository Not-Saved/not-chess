import { useState, useCallback, useEffect, useRef } from "react";
import { notChess } from "../api";

export default function useGames({ initGameState = [], initMine = false }) {
	const subscribed = useRef(true);
	const [games, setGames] = useState(null);
	const [gameState, setGameState] = useState(initGameState);
	const [mine, setMine] = useState(initMine);

	const getGames = useCallback(async () => {
		const response = await notChess({
			method: "get",
			url: "/games",
			params: { state: gameState, mine: mine }
		});
		if (subscribed.current) {
			setGames(response.data);
		}
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

	const deleteGame = useCallback(
		async id => {
			await notChess({
				method: "delete",
				url: `/games/${id}`
			});
			await getGames();
		},
		[getGames]
	);

	useEffect(() => {
		subscribed.current = true;
		setGames(null);
		getGames();
		return () => (subscribed.current = false);
	}, [getGames, subscribed]);

	return {
		games,
		getGames,
		postGame,
		joinGame,
		deleteGame,
		gameState,
		setGameState,
		mine,
		setMine
	};
}
