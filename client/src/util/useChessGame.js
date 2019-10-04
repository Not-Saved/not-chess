import { useState, useCallback, useEffect, useRef } from "react";
import { notChess } from "../api";

export default function useChessGame(id) {
	const subscribed = useRef(true);
	const interval = useRef(null);
	const [game, setGame] = useState(null);

	const getGame = useCallback(async () => {
		const response = await notChess({
			method: "get",
			url: `/games/${id}`
		});
		if (subscribed.current) setGame(response.data);
	}, [setGame, id]);

	const makeMove = useCallback(
		async move => {
			try {
				const response = await notChess({
					method: "post",
					url: `/game/${id}/move`,
					data: move
				});
				if (subscribed) setGame(response.data);
			} catch (e) {
				console.log(e);
			}
		},
		[setGame, id]
	);

	useEffect(() => {
		interval.current = setInterval(() => getGame(), 2000);

		return () => {
			subscribed.current = false;
			clearInterval(interval.current);
		};
	}, [getGame]);

	useEffect(() => {
		if (game && ["CHECKMATE", "DRAW"].includes(game.state)) {
			clearInterval(interval.current);
		}
	}, [game]);

	useEffect(() => {
		getGame(true);
	}, [getGame]);

	return {
		game,
		makeMove
	};
}
