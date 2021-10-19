import React from "react";
import { Popup } from "semantic-ui-react";

import "./gameFilter.css";

const GameFilter = ({ gameState, setGameState, mine, setMine }) => {
	const renderTrigger = (
		<button className="ui basic compact fluid button">
			<i className="filter icon"></i>
			Filter
		</button>
	);

	const gameStateSelected = (state) => {
		return gameState.includes(state) ? "basic green" : "basic";
	};

	const mineSelected = () => {
		return mine ? "basic green" : "basic";
	};

	const toggleMine = () => {
		setMine(!mine);
	};

	const toggleGameState = (state) => {
		if (gameState.includes(state)) {
			setGameState(gameState.filter((el) => el !== state));
		} else {
			setGameState([...gameState, state]);
		}
	};

	return (
		<Popup
			trigger={renderTrigger}
			on="click"
			position="top center"
			offset={[3, -8]}
			popperModifiers={{
				flip: { behavior: ["bottom-start", "bottom-end"] },
			}}
		>
			<div className="game filter">
				<h3 className="ui header">GAME STATE</h3>
				<div className="ui divider"></div>
				<div className="item">
					<div className={`ui large fluid label clickable ${mineSelected()}`} onClick={toggleMine}>
						<i className="user icon"></i>
						My games
					</div>
				</div>
				<div className="ui divider"></div>
				<div className="ui list">
					<div className="item">
						<div
							className={`ui large fluid label clickable 
							${gameStateSelected("NEW")}`}
							onClick={() => toggleGameState("NEW")}
						>
							<i className="hourglass start icon"></i>
							New
						</div>
					</div>
					<div className="item">
						<div
							className={`ui large fluid label clickable 
							${gameStateSelected("IN_PROGRESS")}`}
							onClick={() => toggleGameState("IN_PROGRESS")}
						>
							<i className="hourglass half icon"></i>
							In progress
						</div>
					</div>
					<div className="item">
						<div
							className={`ui large fluid label clickable 
							${gameStateSelected("CHECKMATE")}`}
							onClick={() => toggleGameState("CHECKMATE")}
						>
							<i className="hourglass end icon"></i>
							Checkmate
						</div>
					</div>
					<div className="item">
						<div
							className={`ui large fluid label clickable
							 ${gameStateSelected("DRAW")}`}
							onClick={() => toggleGameState("DRAW")}
						>
							<i className="handshake end icon"></i>
							Draw
						</div>
					</div>
				</div>
			</div>
		</Popup>
	);
};

export default GameFilter;
