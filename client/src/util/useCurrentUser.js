import { useState, useCallback } from "react";
import { notChess } from "../api";

export default function useCurrentUser() {
	const [user, setUser] = useState(null);

	const getUser = useCallback(async () => {
		const response = await notChess({
			method: "get",
			url: "/current_user"
		});
		setUser(response.data);
	}, [setUser]);

	const postUser = useCallback(
		async data => {
			const response = await notChess({
				method: "post",
				url: "/current_user",
				data: data
			});
			setUser(response.data);
		},
		[setUser]
	);

	const logout = useCallback(async () => {
		await notChess({
			method: "get",
			url: "/logout"
		});
		setUser(null);
	}, [setUser]);

	return { user, getUser, postUser, logout };
}
