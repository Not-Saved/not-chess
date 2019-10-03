import React from "react";
import { withRouter } from "react-router-dom";
import { Modal } from "semantic-ui-react";
import Card from "../Card";

import "../../styles/winModal.css";

const WinModal = ({ history, open, setOpen, game }) => {
	const onClose = () => {
		setOpen(false);
	};
	if (game && game.winner) {
		return (
			<Modal
				basic
				onClose={onClose}
				open={open}
				className="nc-win-modal win modal"
			>
				<Card className="win modal">
					<div
						className="main layout"
						style={{
							textAlign: "center"
						}}
					>
						<h2 className="ui icon header">
							<img
								src={`/${game.winner._user.icon}`}
								className="ui circular image"
								alt={""}
							/>
							<div className="content">
								{`${game.winner._user.userName} wins!`}
								<div className="sub header">
									{`The game ended in ${game.moves.length} half-moves.`}
								</div>
							</div>
						</h2>
					</div>
					<div className="back">
						<h3
							className="ui header"
							onClick={() => history.push("/games")}
							style={{ cursor: "pointer" }}
						>
							<i
								className="left angle icon fitted"
								style={{ paddingRight: 7 }}
							></i>
							Games
						</h3>
					</div>
				</Card>
			</Modal>
		);
	}
	return null;
};

export default withRouter(WinModal);
