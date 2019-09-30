import React from "react";
import { withRouter } from "react-router-dom";
import Footer from "components/Footer";

import "styles/chessGameFooter.css";

const ChessGameFooter = ({ history }) => {
	return (
		<Footer style={{ zIndex: 12 }}>
			<div
				className="ui container centered chess game footer"
				style={{ height: "100%" }}
			>
				<div className="grid">
					<div className="left item">
						<button
							className="ui basic compact fluid button"
							onClick={() => history.push("/games")}
						>
							<i className="left angle icon"></i>
							<span style={{ fontWeight: "bold" }}>Games</span>
						</button>
					</div>
				</div>
			</div>
		</Footer>
	);
};

export default withRouter(ChessGameFooter);
