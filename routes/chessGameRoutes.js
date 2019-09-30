const _ = require("lodash");
const requireLogin = require("../middlewares/requireLogin");
const mongoose = require("mongoose");
const Chess = require("chess.js").Chess;

const Game = mongoose.model("games");

module.exports = app => {
	app.post("/api/game/:id/move", requireLogin, async (req, res) => {
		try {
			const id = req.params.id;
			const move = req.body;

			let game = await Game.findOne({ _id: id })
				.populate("whitePlayer._user")
				.populate("blackPlayer._user")
				.populate("winner._user");
			let chessJsGame = new Chess(game.fen);

			let player = null;
			if (game.whitePlayer._user.id === req.user.id)
				player = game.whitePlayer;
			if (game.blackPlayer._user.id === req.user.id)
				player = game.blackPlayer;

			if (!player) throw "Not participating in current game";
			if (chessJsGame.turn() !== player.color) throw "Not your turn";
			if (!["NEW", "IN_PROGRESS"].includes(game.state)) throw "Game over";

			let checkedMove = chessJsGame.move(move);
			if (checkedMove) {
				game.moves.push(checkedMove);
				game.fen = chessJsGame.fen();
				if (game.moves.length) {
					game.state = "IN_PROGRESS";
				}
				if (chessJsGame.in_checkmate()) {
					const winnerField =
						chessJsGame.turn() === "w"
							? "blackPlayer"
							: "whitePlayer";
					game.winner = game[winnerField];
					game.state = "CHECKMATE";
				} else if (chessJsGame.in_draw()) {
					game.state = "DRAW";
				}
			}
			console.log("CHECKMATE: " + chessJsGame.in_checkmate());
			console.log("STALEMATE: " + chessJsGame.in_stalemate());
			console.log("DRAW: " + chessJsGame.in_draw());
			console.log("THREFOLD: " + chessJsGame.in_threefold_repetition());

			game = await game.save();
			res.send(game);
		} catch (e) {
			res.send(e);
		}
	});
};
