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
	lastSignedIn: { type: Date, default: () => Date.now() }
});

userSchema.virtual("setUp").get(function() {
	return Boolean(this.userName && this.icon);
});

function userNameValidator(value) {
	return value.length < 12 && value.length > 3;
}

mongoose.model("users", userSchema);
