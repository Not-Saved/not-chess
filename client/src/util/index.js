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

export function getGameStateIcon(state) {
	switch (state) {
		case "IN_PROGRESS":
			return "hourglass half";
		case "CHECKMATE":
			return "hourglass end";
		case "DRAW":
			return "handshake";
		default:
			return "hourglass start";
	}
}

export function getTimeSinceUpdated(date) {
	const now = Date.now();
	date = new Date(date);

	let timeDiff = Math.ceil(Math.abs(now - date) / (1000 * 60));
	//MINUTES
	if (timeDiff < 60) return `${Math.floor(timeDiff)}m`;
	//HOURS
	timeDiff = timeDiff / 60;
	if (timeDiff < 24) return `${Math.floor(timeDiff)}h`;
	//DAYS
	timeDiff = timeDiff / 24;
	if (timeDiff < 7) return `${Math.floor(timeDiff)}d`;
	//WEEKS
	timeDiff = timeDiff / 7;
	if (timeDiff < 4) return `${Math.floor(timeDiff)}w`;
	//DATE
	const dateStringParts = date.toDateString().split(" ");
	const dateString = `${dateStringParts[1]} ${dateStringParts[2]}`;
	return `${dateString}`;
}
