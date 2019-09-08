import React from "react";

const getPiece = piece => {
	switch (piece.type) {
		case "r":
			return <span>&#9820;</span>;
		case "n":
			return <span>&#9822;</span>;
		case "b":
			return <span>&#9821;</span>;
		case "q":
			return <span>&#9819;</span>;
		case "k":
			return <span>&#9818;</span>;
		default:
			return <span>&#9823;</span>;
	}
};

const Square = ({ square, piece, onClick }) => {
	let squareColor = (square[0] + square[1]) % 2 ? "nc-black" : "nc-white";

	const renderPiece = () => {
		if (piece) {
			let pieceColor = piece.color === "b" ? "nc-black" : "nc-white";
			return (
				<div className={`nc-piece ${pieceColor}`}>
					{getPiece(piece)}
				</div>
			);
		}
		return null;
	};

	return (
		<div className={`nc-square ${squareColor}`} onClick={onClick}>
			{renderPiece()}
		</div>
	);
};

export default Square;
