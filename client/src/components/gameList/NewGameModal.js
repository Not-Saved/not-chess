import React from "react";
import { withRouter } from "react-router-dom";
import { Modal } from "semantic-ui-react";
import Card from "../Card";

import "../../styles/newGameModal.css";

const NewGameModal = ({ history, open, setOpen }) => {
	return (
		<Modal
			closeOnDimmerClick
			basic
			onClose={() => setOpen(false)}
			open={open}
			className="nc-game-modal new game modal"
		>
			<Card className="new game modal card">
				<div style={{ position: "relative" }}>
					<div
						className="ui center aligned grid"
						style={{ margin: "0px" }}
					>
						<div className="grid row" style={{ padding: 7 }}>
							<h2 className="ui header">
								<i className="chess big icon"></i>
								<div className="content">New game</div>
							</h2>
						</div>
						<div
							className="ui divider"
							style={{ margin: "8px 14px 14px 14px" }}
						></div>
						<div className="grid row" style={{ padding: 0 }}>
							<span>Play as</span>
						</div>

						<div className="grid row" style={{ padding: 7 }}>
							<div className="grid column"></div>
							<div className="grid column"></div>
						</div>
					</div>
				</div>
			</Card>
		</Modal>
	);
};

export default withRouter(NewGameModal);
