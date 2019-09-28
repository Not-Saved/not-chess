const _ = require("lodash");
const requireLogin = require("../middlewares/requireLogin");
const mongoose = require("mongoose");

const User = mongoose.model("users");

module.exports = app => {
	app.get("/api/current_user", (req, res) => {
		res.send(req.user);
	});

	app.post("/api/current_user", requireLogin, async (req, res) => {
		const { userName, icon } = req.body;
		if (userName) req.user.userName = _.upperFirst(userName);
		if (icon) req.user.icon = icon;
		try {
			const user = await req.user.save();
			res.send(user);
		} catch (e) {
			res.send(e);
		}
	});

	app.post("/api/current_user/validate", requireLogin, async (req, res) => {
		let { userName } = req.body;
		userName = _.upperFirst(userName);
		let errors = {};
		try {
			const response = await User.find({ userName: userName });
			if (response.length && response[0].userName !== req.user.userName) {
				errors.userName = "Username already taken.";
			}
			res.send(errors);
		} catch (e) {
			res.send(e);
		}
	});
};
