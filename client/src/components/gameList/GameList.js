import React, { useContext } from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import { UserContext } from "context";
import GameCard from "./GameCard";
import useWindowDimentions from "../../util/useWindowsDimensions";

const GameList = ({ data, openModal }) => {
	const { height, width } = useWindowDimentions();
	const { user } = useContext(UserContext);

	const Row = ({ index, style }) => {
		let game = data[index];
		return (
			<div key={index} style={{ ...style, height: getGameCardHeight() }}>
				<GameCard
					game={game}
					user={user}
					onClick={e => openModal(e, game)}
				/>
			</div>
		);
	};

	const getGameCardHeight = () => {
		if (width < 580) return 102;
		if (height < 750) return 124;
		return 177;
	};

	return (
		<div>
			<div
				className="ui container centered text"
				style={{ height: height - 90 }}
			>
				<AutoSizer>
					{({ height, width }) => (
						<List
							itemCount={data.length}
							width={width}
							height={height}
							itemSize={getGameCardHeight()}
							className="List scrolling"
							overscanCount={3}
						>
							{Row}
						</List>
					)}
				</AutoSizer>
			</div>
		</div>
	);
};

export default GameList;
