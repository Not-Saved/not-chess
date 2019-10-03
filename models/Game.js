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
	turn: { type: String, default: "w" },
	moves: {
		type: [
			{
				color: String,
				from: String,
				to: String,
				flags: String,
				piece: String,
				san: String,
				createdAt: { type: Date, default: () => Date.now() }
			}
		],
		default: []
	},
	winner: {
		_user: { type: Schema.Types.ObjectId, ref: "users" },
		color: { type: String }
	},
	host: { type: Schema.Types.ObjectId, ref: "users" },
	createdAt: { type: Date, default: () => Date.now() },
	lastUpdated: { type: Date, default: () => Date.now() }
});

gameSchema.plugin(autoIncrement.plugin, {
	model: "games",
	field: "gameId",
	startAt: 1
});
mongoose.model("games", gameSchema);
