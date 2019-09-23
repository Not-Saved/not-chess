import React from "react";

export const UserContext = React.createContext({
	user: null,
	getUser: () => null,
	postUser: () => null,
	logout: () => null
});
