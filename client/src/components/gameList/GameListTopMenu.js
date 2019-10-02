import React, { useContext } from "react";

import { UserContext } from "context";
import Footer from "components/Footer";
import GameFilter from "./GameFilter";
import "styles/gameListFooter.css";

const GameListTopMenu = ({ setOpen, ...rest }) => {
	const { user } = useContext(UserContext);

	return (
		<div className="ui container centered game list footer">
			<div className="grid">
				<div className="left item">Hello</div>
				<div className="right item">S</div>
			</div>
		</div>
	);
};

export default GameListTopMenu;
