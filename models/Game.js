const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const { Schema } = mongoose;

const gameSchema = new Schema({
	whitePlayer: {
		_user: { type: Schema.Types.ObjectId, ref: "users" },
		color: { type: String, default: "w" }
	},
	blackPlayer: {
		_user: { type: Schema.Types.ObjectId, ref: "users" },
		color: { type: String, default: "b" }
	},
	state: { type: String, default: "NEW" },
	fen: {
		type: String,
		default: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
	},
	moves: { type: [String], default: [] },
	winner: {
		_user: { type: Schema.Types.ObjectId, ref: "users" },
		color: { type: String }
	},
	createdAt: { type: Date, default: () => Date.now() }
});

gameSchema.plugin(autoIncrement.plugin, {
	model: "games",
	field: "gameId",
	startAt: 1
});
mongoose.model("games", gameSchema);
