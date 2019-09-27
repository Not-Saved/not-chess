const _ = require("lodash");
const passport = require("passport");
const requireLogin = require("../middlewares/requireLogin");
const mongoose = require("mongoose");

const User = mongoose.model("users");

module.exports = app => {
	app.get(
		"/auth/google",
		passport.authenticate("google", { scope: ["profile"] })
	);

	app.get(
		"/auth/google/redirect",
		passport.authenticate("google"),
		(req, res) => {
			res.redirect("/");
		}
	);

	app.get("/api/logout", (req, res) => {
		req.logout();
		res.redirect("/");
	});

	app.get("/api/current_user", (req, res) => {
		res.send(req.user);
	});

	app.post("/api/current_user", requireLogin, async (req, res) => {
		const { userName, icon } = req.body;
		if (userName) req.user.userName = userName;
		if (icon) req.user.icon = icon;
		try {
			const user = await req.user.save();
			res.send(user);
		} catch (e) {
			res.status(400).send(e);
		}
	});

	app.post("/api/current_user/validate", requireLogin, async (req, res) => {
		const { userName } = req.body;
		try {
			const response = await User.find({ userName: userName });
			if (response.length) {
				throw response;
			}
			res.send(response);
		} catch (e) {
			res.status(400).send({});
		}
	});
};
