const passport = require("passport");
const _ = require("lodash");

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
};
