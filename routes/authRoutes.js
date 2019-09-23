const _ = require("lodash");
const passport = require("passport");
const requireLogin = require("../middlewares/requireLogin");

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
		req.user.userName = userName;
		req.user.icon = icon;

		const user = await req.user.save();
		res.send(user);
	});
};
