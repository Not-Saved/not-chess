import { useState, useCallback, useEffect, useRef } from "react";
import { notChess } from "../api";

export default function useUsers() {
	const subscribed = useRef(true);
	const interval = useRef(null);
	const [users, setUsers] = useState(null);

	const getUsers = useCallback(async () => {
		const response = await notChess({
			method: "get",
			url: "/users"
		});
		if (subscribed.current) setUsers(response.data);
	}, []);

	useEffect(() => {
		interval.current = setInterval(() => getUsers(), 5000);

		return () => {
			subscribed.current = false;
			clearInterval(interval.current);
		};
	}, [getUsers]);

	useEffect(() => {
		getUsers();
	}, [getUsers]);

	return { users };
}
