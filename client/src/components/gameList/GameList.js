import React, { useContext, useEffect, useState } from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import { UserContext } from "context";
import GameCard from "./GameCard";
import useWindowDimentions from "../../util/useWindowsDimensions";

import "./gameList.css";

const GameList = ({ data, openModal }) => {
	const { height, width } = useWindowDimentions();
	const { user } = useContext(UserContext);
	const [cardHeight, setCardHeight] = useState(0);

	useEffect(() => {
		const getGameCardHeight = (height, width) => {
			if (width < 580) return 102;
			if (height < 750) return 124;
			return 177;
		};
		setCardHeight(getGameCardHeight(height, width));
	}, [height, width]);

	const row = ({ index, style }) => {
		let game = data[index];
		if (index === data.length - 1) index = "last";
		return (
			<div id={index} key={index} style={style}>
				<GameCard game={game} user={user} onClick={e => openModal(e, game)} />
			</div>
		);
	};

	return (
		<div className="ui container centered text game list" style={{ height: "100%" }}>
			<AutoSizer>
				{({ height, width }) => (
					<List
						itemCount={data.length}
						width={width}
						height={height}
						itemSize={cardHeight}
						className="List scrollbar hidden"
						overscanCount={3}
					>
						{row}
					</List>
				)}
			</AutoSizer>
		</div>
	);
};

export default GameList;
