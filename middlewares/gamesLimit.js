const mongoose = require("mongoose");
const Game = mongoose.model("games");

module.exports = async (req, res, next) => {
	const gamesCount = await Game.countDocuments({
		$or: [
			{ "whitePlayer._user": req.user.id },
			{ "blackPlayer._user": req.user.id }
		]
	});
	if (gamesCount > 20) {
		return res.status(401).send({ error: "Games limit reached!" });
	}
	next();
};
