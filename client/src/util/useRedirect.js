import { useEffect, useContext } from "react";

import { UserContext } from "context";

export default function useRedirect(location, history) {
	const { user } = useContext(UserContext);

	useEffect(() => {
		if (location === "/") {
			if (!user) {
				history.push("/login");
			} else if (!user.setUp) {
				history.push("/setup");
			}
		} else if (location === "/login") {
			if (user && !user.setUp) {
				history.push("/setup");
			} else if (user) {
				history.push("/");
			}
		} else if (location === "/user/settings") {
			if (!user) {
				history.push("/login");
			}
		}
	}, [location, history, user]);
}
