const _ = require("lodash");
const requireLogin = require("../middlewares/requireLogin");
const mongoose = require("mongoose");
const Chess = require("chess.js").Chess;

const Game = mongoose.model("games");
const User = mongoose.model("users");

module.exports = app => {
	app.post("/api/game/:id/move", requireLogin, async (req, res) => {
		try {
			const id = req.params.id;
			const move = req.body;

			let game = await Game.findOne({ _id: id });

			let chessJsGame = new Chess(game.fen);
			const turn = chessJsGame.turn();

			let player = null;
			if (String(game.whitePlayer._user) === req.user.id) player = game.whitePlayer;
			if (String(game.blackPlayer._user) === req.user.id) player = game.blackPlayer;

			if (!player) throw "Not participating in current game";
			if (turn !== player.color) throw "Not your turn";
			if (!["NEW", "IN_PROGRESS"].includes(game.state)) throw "Game over";

			let checkedMove = chessJsGame.move(move);
			if (checkedMove) {
				game.moves.push(checkedMove);
				game.fen = chessJsGame.fen();
				game.lastUpdated = Date.now();
				game.turn = chessJsGame.turn();

				if (chessJsGame.game_over()) {
					if (chessJsGame.in_checkmate()) {
						const winnerField = turn === "b" ? "blackPlayer" : "whitePlayer";
						const loserField = turn === "b" ? "whitePlayer" : "blackPlayer";

						game.winner = game[winnerField];
						game.state = "CHECKMATE";

						await User.updateOne(
							{ _id: game[winnerField]._user },
							{ $inc: { "won.checkmate": 1 } }
						);
						await User.updateOne(
							{ _id: game[loserField]._user },
							{ $inc: { "lost.checkmate": 1 } }
						);
					} else if (chessJsGame.in_draw() || chessJsGame.in_stalemate()) {
						game.state = "DRAW";

						await User.updateMany(
							{
								_id: {
									$in: [game[winnerField]._user, game[loserField]._user]
								}
							},
							{ $inc: { "draw.stalemate": 1 } }
						);
					}
				}
			}

			game = await game.save();
			game = await Game.populate(game, "whitePlayer._user");
			game = await Game.populate(game, "blackPlayer._user");
			game = await Game.populate(game, "winner._user");
			res.send(game);
		} catch (e) {
			res.send(e);
		}
	});
};
