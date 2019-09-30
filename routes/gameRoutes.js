const _ = require("lodash");
const requireLogin = require("../middlewares/requireLogin");
const gamesLimit = require("../middlewares/gamesLimit");
const mongoose = require("mongoose");

const Game = mongoose.model("games");

module.exports = app => {
	app.get("/api/games", async (req, res) => {
		try {
			const { pageSize = 20, page = 1 } = req.query;
			let query = {};
			if (req.query.state) {
				query = { state: { $in: req.query.state } };
			}

			if (req.query.mine && req.query.mine === "true") {
				query = {
					...query,
					$or: [
						{ "whitePlayer._user": req.user.id },
						{ "blackPlayer._user": req.user.id }
					]
				};
			}
			const games = await Game.find(query)
				.skip(pageSize * (page - 1))
				.limit(pageSize)
				.sort({ createdAt: -1 })
				.populate("whitePlayer._user")
				.populate("blackPlayer._user")
				.populate("winner._user");
			res.send(games);
		} catch (e) {
			res.send(e);
		}
	});

	app.get("/api/games/:id", async (req, res) => {
		try {
			const game = await Game.findOne({ _id: req.params.id })
				.populate("whitePlayer._user")
				.populate("blackPlayer._user")
				.populate("winner._user");
			res.send(game);
		} catch (e) {
			res.status(404).send("Game not found!");
		}
	});

	app.post("/api/games", requireLogin, gamesLimit, async (req, res) => {
		try {
			const color =
				req.query.color === "b" ? "blackPlayer" : "whitePlayer";
			let game = new Game({ [color]: { _user: req.user.id } });

			game = await game.save();
			game = await Game.populate(game, `${color}._user`);
			res.send(game);
		} catch (e) {
			res.send(e);
		}
	});

	app.post("/api/games/:id", requireLogin, gamesLimit, async (req, res) => {
		try {
			let game = await Game.findOne({ _id: req.params.id });

			if (game.state !== "NEW") {
				throw "Game already started!";
			}
			if (
				String(game.blackPlayer._user) === req.user.id ||
				String(game.whitePlayer._user) === req.user.id
			) {
				throw "Already participating in game!";
			}

			const color = game.whitePlayer._user
				? "blackPlayer"
				: "whitePlayer";
			game[color]["_user"] = req.user.id;
			game.state = "IN_PROGRESS";
			game.lastUpdated = Date.now();

			game = await game.save();
			game = await Game.populate(game, "whitePlayer._user");
			game = await Game.populate(game, "blackPlayer._user");
			game = await Game.populate(game, "winner._user");
			res.send(game);
		} catch (e) {
			res.status(401).send(e);
		}
	});
};
