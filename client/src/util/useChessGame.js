import { useState, useCallback, useEffect } from "react";
import { notChess } from "../api";

export default function useChessGame(id) {
	const [game, setGame] = useState(null);
	const [intervalRef, setIntervalRef] = useState(null);

	const getGame = useCallback(
		async isSubscribed => {
			const response = await notChess({
				method: "get",
				url: `/games/${id}`
			});
			if (isSubscribed) setGame(response.data);
		},
		[setGame, id]
	);

	const makeMove = useCallback(
		async move => {
			try {
				const response = await notChess({
					method: "post",
					url: `/game/${id}/move`,
					data: move
				});
				setGame(response.data);
			} catch (e) {
				console.log(e);
			}
		},
		[setGame, id]
	);

	useEffect(() => {
		let isSubscribed = true;
		let interval = setInterval(() => getGame(isSubscribed), 2000);
		setIntervalRef(interval);

		return () => {
			isSubscribed = false;
			clearInterval(interval);
		};
	}, [getGame]);

	useEffect(() => {
		if (game && ["CHECKMATE", "DRAW"].includes(game.state)) {
			clearInterval(intervalRef);
		}
	}, [game, intervalRef]);

	useEffect(() => {
		getGame(true);
	}, [getGame]);

	return {
		game,
		makeMove
	};
}
