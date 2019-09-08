import React, { useState, useEffect } from "react";
import Square from "./Square";

import "../styles/chessBoard.css";

const ChessBoard = ({ game }) => {
	const [board, setBoard] = useState(game.board());
	useEffect(() => {}, [board]);

	const makeMove = move => {
		const result = game.move(move);
		console.log(result);
		if (result) {
			setBoard(game.board());
		}
	};

	function* move() {
		while (true) {
			let move = {};
			move.from = yield;

			console.log(move);
			if (move.from.piece && move.from.piece.color === game.turn()) {
				move.to = yield;
				makeMove({
					from: move.from.square,
					to: move.to.square,
					promotion: "q"
				});
			}
		}
	}
	const moveIt = move();
	moveIt.next();

	const renderSquares = () => {
		let squares = [];

		for (let rk = 0; rk < 8; rk++) {
			for (let fl = 0; fl < 8; fl++) {
				let piece = board[rk][fl];
				let square = [rk, fl];

				squares.push(
					<Square
						key={square}
						square={square}
						squareString={getSquareString(square)}
						piece={piece}
						onClick={e => {
							moveIt.next({
								square: getSquareString(square),
								piece
							});
						}}
					/>
				);
			}
		}
		return squares;
	};

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center"
			}}
		>
			<div className="nc-chessgrid">{renderSquares()}</div>
		</div>
	);
};

const getSquareString = square => {
	return (
		String.fromCharCode(String(square[1] + 1).charCodeAt(0) + 48) +
		String.fromCharCode(String(8 - square[0]).charCodeAt(0))
	);
};

/*const getSquareArray = square => {
	return [parseInt(square[0].charCodeAt(0) - 97), 8 - parseInt(square[1])];
};*/

export default ChessBoard;
