import { useEffect, useContext } from "react";

import { UserContext } from "context";

export default function useRedirect(location, history) {
	const { user } = useContext(UserContext);

	useEffect(() => {
		if (["/", "/login", "/setup"].includes(location)) {
			if (!user) {
				history.push("/login");
			} else if (!user.setUp) {
				history.push("/setup");
			} else {
				history.push("/");
			}
		}
	}, [location, history, user]);
}
