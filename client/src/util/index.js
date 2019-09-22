export function getGameStateString(gameState) {
	switch (gameState) {
		case "NEW":
			return "New";
		case "STALEMATE":
			return "Draw";
		case "CHECKMATE":
			return "Checkmate";
		default:
			return "In progress";
	}
}
