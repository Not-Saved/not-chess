import React from "react";

const Square = ({
	square,
	piece,
	firstClick,
	onClick,
	moveHighlight,
	moveHighlightColor,
	pieceHighlight,
	turn,
	playingColor,
	style
}) => {
	let moveHighlightVisible = moveHighlight ? "visible" : "hidden";
	moveHighlightColor = moveHighlightColor === "b" ? "nc-black" : "nc-white";
	let pieceHighlightVisible = pieceHighlight ? "visible" : "hidden";
	let squareColor = (square[0] + square[1]) % 2 ? "nc-black" : "nc-white";
	let pieceColor = piece && piece.color === "b" ? "nc-black" : "nc-white";

	const renderPiece = () => {
		if (piece) {
			let isClickable =
				!firstClick && playingColor === piece.color && turn === piece.color
					? "clickable"
					: "";
			return (
				<div
					className={`nc-piece ${pieceColor} ${isClickable}`}
					style={{
						position: "absolute"
					}}
				>
					{getPiece(piece)}
				</div>
			);
		}
		return null;
	};
	return (
		<div
			className={`nc-square ${squareColor}`}
			style={{ position: "relative", ...style }}
			onClick={onClick}
		>
			{renderPiece()}
			<div
				className={`nc-piece ${moveHighlightColor} nc-move-highlight full height width`}
				style={{
					position: "absolute",
					visibility: moveHighlightVisible
				}}
			></div>
			<div
				className={`nc-piece ${pieceColor} nc-piece-highlight full height width`}
				style={{
					position: "absolute",
					visibility: pieceHighlightVisible
				}}
			></div>
		</div>
	);
};

export default Square;

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
