const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
	googleId: String,
	userName: {
		type: String,
		validate: userNameValidator,
		index: { unique: true, dropDups: true }
	},
	icon: { type: String },
	superAdmin: Boolean,
	createdAt: { type: Date, default: () => Date.now() },
	lastSignedIn: { type: Date, default: () => Date.now() },
	won: {
		checkmate: { type: Number, default: 0 },
		resign: { type: Number, default: 0 }
	},
	lost: {
		checkmate: { type: Number, default: 0 },
		resign: { type: Number, default: 0 }
	},
	draw: {
		stalemate: { type: Number, default: 0 },
		threefold: { type: Number, default: 0 },
		fifty: { type: Number, default: 0 },
		agreed: { type: Number, default: 0 }
	}
});

userSchema.virtual("setUp").get(function() {
	return Boolean(this.userName && this.icon);
});

function userNameValidator(value) {
	return value.length < 12 && value.length > 3;
}

mongoose.model("users", userSchema);
