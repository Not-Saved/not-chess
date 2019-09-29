import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Modal } from "semantic-ui-react";
import Card from "../Card";

import "../../styles/newGameModal.css";

const NewGameModal = ({ history, open, setOpen, postGame }) => {
	const [color, setColor] = useState("white");

	const active = state => {
		return color === state ? iconColor() : null;
	};

	const iconColor = () => {
		const style = getComputedStyle(document.body);
		return color === "black"
			? style.getPropertyValue("--nc-black")
			: style.getPropertyValue("--nc-white");
	};

	const onPost = async () => {
		await postGame(color);
		setOpen(false);
	};

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
						<div
							className="grid middle aligned row"
							style={{ padding: "5px 0px 0px 0px" }}
						>
							<h3 className="ui header" style={{ fontSize: 30 }}>
								New game
							</h3>
						</div>
						<div
							className="grid middle aligned row"
							style={{
								padding: 0,
								color: "grey",
								fontWeight: "bold"
							}}
						>
							<span>Play as</span>
						</div>

						<div
							className="ui divider"
							style={{ margin: "8px 14px 7px 14px" }}
						></div>

						<div
							className="grid middle aligned row"
							style={{ padding: 5 }}
						>
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center"
								}}
							>
								<i className="icons">
									<i
										className="circle fitted icon"
										style={{ fontSize: 80 }}
									></i>
									<i
										className="chess queen fitted icon"
										style={{
											fontSize: 44,
											color: iconColor()
										}}
									></i>
								</i>
							</div>
						</div>
						<div
							className="ui divider"
							style={{ margin: "5px 13%" }}
						></div>
						<div
							className="grid middle aligned row"
							style={{ padding: 0 }}
						>
							<div className="ui horizontal list">
								<div
									className="item"
									style={{
										width: "90px",
										textAlign: "center"
									}}
								>
									<label
										className={`ui large fluid basic label clickable`}
										onClick={() => setColor("white")}
										style={{
											color: active("white"),
											borderColor: active("white")
										}}
									>
										White
									</label>
								</div>
								<div
									className="item"
									style={{
										width: "90px",
										textAlign: "center"
									}}
								>
									<label
										className={`ui large fluid basic label clickable`}
										onClick={() => setColor("black")}
										style={{
											color: active("black"),
											borderColor: active("black")
										}}
									>
										Black
									</label>
								</div>
							</div>
						</div>

						<div
							className="ui divider"
							style={{ margin: "5px 14px 5px 14px" }}
						></div>
						<div
							className="grid middle aligned row"
							style={{
								padding: "3px 0px 0px 0px",
								textAlign: "center"
							}}
						>
							<button
								className="ui basic green compact button"
								onClick={() => onPost()}
								style={{ margin: 0 }}
							>
								<i className="check icon"></i>
								Create
							</button>
						</div>
					</div>
				</div>
			</Card>
		</Modal>
	);
};

export default withRouter(NewGameModal);
