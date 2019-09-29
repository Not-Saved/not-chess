import React from "react";
import { Popup } from "semantic-ui-react";

const GameFilter = ({ gameState, setGameState }) => {
	const renderTrigger = (
		<button className="ui basic compact fluid button">
			<i className="filter icon" style={{ paddingRight: 15 }}></i>
			<span style={{ fontWeight: "bold" }}>Filter</span>
		</button>
	);

	const selected = state => {
		return gameState.includes(state) ? "basic green" : "basic";
	};

	const onclick = state => {
		if (gameState.includes(state)) {
			setGameState(gameState.filter(el => el !== state));
		} else {
			setGameState([...gameState, state]);
		}
	};

	return (
		<Popup
			trigger={renderTrigger}
			on="click"
			position="top center"
			offset="0px,-8px"
			popperModifiers={{
				flip: { behavior: ["bottom-start", "bottom-end"] }
			}}
		>
			<div>
				<h3
					className="ui header"
					style={{
						marginBottom: 5,
						textAlign: "center",
						fontSize: 17
					}}
				>
					GAME STATE
				</h3>
				<div
					className="ui divider"
					style={{ margin: "0px -5px 0px -5px" }}
				></div>
				<div className="ui list" style={{ marginTop: 7 }}>
					<div className="item">
						<div
							className={`ui large fluid ${selected(
								"NEW"
							)} label clickable`}
							onClick={() => onclick("NEW")}
						>
							<i className="hourglass start icon"></i> New
						</div>
					</div>
					<div className="item">
						<div
							className={`ui large fluid ${selected(
								"IN_PROGRESS"
							)} label clickable`}
							onClick={() => onclick("IN_PROGRESS")}
						>
							<i className="hourglass half icon"></i> In progress
						</div>
					</div>
					<div className="item">
						<div
							className={`ui large fluid ${selected(
								"CHECKMATE"
							)} label clickable`}
							onClick={() => onclick("CHECKMATE")}
						>
							<i className="hourglass end icon"></i> Checkmate
						</div>
					</div>
					<div className="item">
						<div
							className={`ui large fluid ${selected(
								"DRAW"
							)} label clickable`}
							onClick={() => onclick("DRAW")}
						>
							<i className="hourglass end icon"></i> Draw
						</div>
					</div>
				</div>
			</div>
		</Popup>
	);
};

export default GameFilter;
