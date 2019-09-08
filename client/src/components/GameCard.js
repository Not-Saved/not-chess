import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import Card from "./Card";
import "../styles/gameCard.css";

const GameCard = ({
	game: { id, date, whitePlayer, blackPlayer, moves },
	history
}) => {
	const [open] = useState(true);

	const renderTopRightIcon = () => {
		/*const iconName = open ? "up angle" : "down angle";
		return (
			<div className="top right angle">
				<i
					className={`${iconName} fitted clickable icon`}
					onClick={() => setOpen(!open)}
				/>
			</div>
		);*/
		return (
			<>
				<div className="top right angle">
					<i
						className={`external fitted clickable icon`}
						onClick={() => history.push(`/chess/${id}`)}
					/>
				</div>
				<div className="bottom left angle">
					<i className="hashtag fitted icon" />
					<span className="sub text"> {id}</span>
				</div>
			</>
		);
	};

	const renderFooter = () => {
		if (open) {
			return (
				<div className="footer">
					<div
						className="ui divider"
						style={{ margin: "8px 15px" }}
					></div>
					<div
						className="ui four column center aligned grid zero-margin nc-font-size"
						style={{ padding: "5px 0px" }}
					>
						<div className="column zero-padding">
							<div>
								<i className="hashtag icon" />
								<span className="sub text">{id}</span>
							</div>
						</div>
						<div className="column zero-padding">
							<div>
								<i className="calendar icon" />
								<span className="sub text">
									{date.toLocaleDateString()}
								</span>
							</div>
						</div>
						<div className="column zero-padding">
							<div>
								<i className="clock icon" />
								<span className="sub text">
									{date.toLocaleTimeString().slice(0, -3)}
								</span>
							</div>
						</div>
						<div className="column zero-padding">
							<div>
								<i className="hourglass icon" />
								<span className="sub text">
									{Math.floor(moves.length / 2 + 1)}
								</span>
							</div>
						</div>
					</div>
				</div>
			);
		}
	};

	return (
		<Card>
			<div className="game-card" style={{ position: "relative" }}>
				<div style={{ position: "relative" }}>
					{renderTopRightIcon()}
					<div className="ui two column center aligned grid zero-margin">
						<div
							className="column"
							style={{ padding: "0px 20px 0px 0px" }}
						>
							<div className="ui two column center aligned grid zero-margin middle aligned">
								<div className="eleven wide column right aligned player">
									<h2 className="ui header">
										<div className="player">
											<span className="name">
												{whitePlayer.name}
											</span>
											<div className="sub header">
												<span>White</span>
											</div>
										</div>
									</h2>
								</div>
								<div className="five wide column zero-padding">
									<i className="big icons">
										<i className="main small user circle fitted icon " />
										{whitePlayer.host ? (
											<i className="chess king fitted top left corner sub icon" />
										) : null}
									</i>
								</div>
							</div>
						</div>
						<div
							className="column"
							style={{ padding: "0px 0px 0px 20px" }}
						>
							<div className="ui two column center aligned grid zero-margin middle aligned">
								<div className="five wide column zero-padding">
									<i className="big icons">
										<i className="main small user circle fitted icon " />
										{blackPlayer.host ? (
											<i className="chess king fitted top right corner sub icon" />
										) : null}
									</i>
								</div>
								<div className="eleven wide column left aligned player">
									<h2 className="ui header">
										<div className="player">
											<span className="name">
												{blackPlayer.name}
											</span>
											<div className="sub header">
												<span>Black</span>
											</div>
										</div>
									</h2>
								</div>
							</div>
						</div>
					</div>
					<div className="ui vertical divider">VS</div>
				</div>
				{renderFooter()}
			</div>
		</Card>
	);
};

export default withRouter(GameCard);
