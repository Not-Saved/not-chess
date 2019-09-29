const _ = require("lodash");
const passport = require("passport");

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
};
