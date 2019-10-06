import { useState, useCallback, useEffect, useRef } from "react";
import { notChess } from "../api";

export default function useGames({
	initGameState = ["NEW", "IN_PROGRESS"],
	initMine = null
}) {
	const subscribed = useRef(false);
	const [games, setGames] = useState(null);
	const [gameState, setGameState] = useState(initGameState);
	const [mine, setMine] = useState(initMine);

	const getGames = useCallback(async (gameState, mine) => {
		subscribed.current && setGames(null);
		const response = await notChess({
			method: "get",
			url: "/games",
			params: { state: gameState, mine: mine }
		});
		subscribed.current && setGames(response.data);
	}, []);

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
		subscribed.current && getGames(gameState, mine);
	}, [gameState, mine, getGames]);

	useEffect(() => {
		const { storageGameState, storageMine } = getStorageValues();
		storageGameState && setGameState(storageGameState);
		setMine(storageMine || false);
		subscribed.current = true;
		return () => (subscribed.current = false);
	}, []);

	useEffect(() => {
		setStorageValues(gameState, mine);
	}, [gameState, mine]);

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

const getStorageValues = () => {
	let storageGameState = sessionStorage.getItem("gameState");
	storageGameState = JSON.parse(storageGameState);
	let storageMine = sessionStorage.getItem("mine");
	storageMine = JSON.parse(storageMine);

	return { storageGameState, storageMine };
};

const setStorageValues = (gameState, mine) => {
	sessionStorage.setItem("gameState", JSON.stringify(gameState));
	sessionStorage.setItem("mine", mine);
};
