import React, { useState, useContext, useEffect } from "react";
import { withRouter } from "react-router-dom";

import { UserContext } from "context";
import ChessGame from "./ChessGame";
import WinModal from "./WinModal";
import ChessGameFooter from "./ChessGameFooter";
import Loading from "components/Loading";
import useChessGame from "util/useChessGame";
import DrawModal from "./DrawModal";

const ChessGameController = ({ match: { params } }) => {
	const [winOpen, setWinOpen] = useState(false);
	const [drawOpen, setDrawOpen] = useState(false);
	const [active, setActive] = useState("");
	const { game, makeMove } = useChessGame(params.id);
	const { user } = useContext(UserContext);

	useEffect(() => {
		if (game && game.winner) {
			setWinOpen(true);
		} else if (game && game.state === "DRAW") {
			setDrawOpen(true);
		}
	}, [game]);

	const onMove = async move => {
		setActive("active");
		await makeMove(move);
		setActive(false);
	};

	const findPlayer = () => {
		let player = null;
		if (!user) return player;
		if (game.whitePlayer._user.id === user.id) player = game.whitePlayer;
		if (game.blackPlayer._user.id === user.id) player = game.blackPlayer;
		return player;
	};

	const renderChessGame = () => {
		if (game) {
			const player = findPlayer();
			const playingColor =
				player && ["NEW", "IN_PROGRESS"].includes(game.state)
					? player.color
					: null;
			const playerField =
				player && player.color === "b" ? "blackPlayer" : "whitePlayer";

			return (
				<ChessGame
					game={game}
					onMove={onMove}
					playerField={playerField}
					playingColor={playingColor}
					active={active}
				/>
			);
		}
		return <Loading />;
	};

	return (
		<>
			<WinModal open={winOpen} setOpen={setWinOpen} game={game} />
			<DrawModal open={drawOpen} setOpen={setDrawOpen} game={game} />
			{renderChessGame()}
			<ChessGameFooter />
		</>
	);
};

export default withRouter(ChessGameController);
