const _ = require("lodash");
const mongoose = require("mongoose");

const User = mongoose.model("users");

module.exports = app => {
	app.get("/api/users", async (req, res) => {
		try {
			const users = await User.find({}, { _id: 0, googleId: 0, superAdmin: 0 });
			res.send(users);
		} catch (e) {
			res.status(400).send(e);
		}
	});
};
