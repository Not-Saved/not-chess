import React from "react";
import { withRouter } from "react-router-dom";
import Footer from "components/Footer";

import "./chessGameFooter.css";

const ChessGameFooter = ({ history, sidebarOpen, setSidebarOpen }) => {
	return (
		<Footer style={{ zIndex: 12 }}>
			<div className="ui container centered chess game footer full height">
				<div className="grid">
					<div className="left item">
						<button
							className="ui basic compact fluid button"
							onClick={() => history.push("/games")}
						>
							<i className="left angle icon"></i>
							Games
						</button>
					</div>
					<div className="right item"></div>
				</div>
			</div>
		</Footer>
	);
};

export default withRouter(ChessGameFooter);
