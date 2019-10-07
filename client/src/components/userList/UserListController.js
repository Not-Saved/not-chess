import React from "react";

import useUsers from "util/useUsers";
import Loading from "components/Loading";
import Empty from "components/gameList/Empty";
import UserList from "./UserList";

const UserListController = () => {
	const { users } = useUsers();

	const sortUsers = users => {
		return users
			.sort((a, b) => {
				return b.won.checkmate + b.won.resign - a.won.checkmate + a.won.resign;
			})
			.slice(0, 10);
	};

	if (!users) {
		return <Loading />;
	} else if (!users.length) {
		return <Empty text="No users found" />;
	} else {
		return <UserList users={sortUsers(users)} />;
	}
};

export default UserListController;
