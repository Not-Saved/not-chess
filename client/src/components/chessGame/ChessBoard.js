import React, { useState, useEffect } from "react";
import Chess from "chess.js";

import Square from "./Square";
import "../../styles/chessBoard.css";

const ChessBoard = ({ chessJsGame, onMove, playingColor, playerField }) => {
	const [firstClick, setFirstClick] = useState(null);
	const [secondClick, setSecondClick] = useState(null);
	const rotation = playerField === "whitePlayer" ? 0 : 180;

	useEffect(() => {
		function makeMove(move) {
			const result = new Chess(chessJsGame.fen()).move(move);
			if (result) {
				onMove(move);
			}
		}
		if (firstClick && secondClick) {
			makeMove({ from: firstClick, to: secondClick, promotion: "q" });
			setFirstClick(null);
			setSecondClick(null);
		}
	}, [firstClick, secondClick, chessJsGame, onMove]);

	function move(e, squareString, piece) {
		if (
			piece &&
			playingColor === piece.color &&
			chessJsGame.turn() === piece.color &&
			!firstClick
		) {
			setFirstClick(squareString);
			return;
		} else if (firstClick) {
			if (squareString === firstClick) {
				setFirstClick(null);
				return;
			}
			setSecondClick(squareString);
			return;
		}
	}

	const renderSquares = () => {
		let squares = [];
		for (let rk = 0; rk < 8; rk++) {
			for (let fl = 0; fl < 8; fl++) {
				let piece = chessJsGame.board()[rk][fl];
				let square = [rk, fl];
				let squareString = getSquareString(square);

				squares.push(
					<Square
						key={square}
						square={square}
						squareString={squareString}
						piece={piece}
						playingColor={playingColor}
						moveHighlight={chessJsGame
							.moves({ square: firstClick, verbose: true })
							.map(e => e.to)
							.includes(squareString)}
						moveHighlightColor={
							chessJsGame.get(firstClick) &&
							chessJsGame.get(firstClick).color
						}
						pieceHighlight={firstClick === squareString}
						turn={chessJsGame.turn()}
						firstClick={firstClick}
						onClick={e => move(e, squareString, piece)}
						style={{ transform: `rotate(${rotation}deg)` }}
					/>
				);
			}
		}
		return squares;
	};

	return (
		<div className="nc-grid-container">
			<div
				className="nc-grid-border"
				style={{ transform: `rotate(${rotation}deg)` }}
			>
				<div className="nc-corner-border">
					<div
						className="nc-chessgrid"
						style={{ position: "relative" }}
					>
						{renderSquares()}
					</div>
				</div>
			</div>
		</div>
	);
};

const getSquareString = square => {
	return (
		String.fromCharCode(String(square[1] + 1).charCodeAt(0) + 48) +
		String.fromCharCode(String(8 - square[0]).charCodeAt(0))
	);
};

export default ChessBoard;
