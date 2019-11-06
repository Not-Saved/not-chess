import React, { useState } from "react";
import { Modal } from "semantic-ui-react";
import Card from "../Card";

import "./newGameModal.css";

const NewGameModal = ({ open, setOpen, postGame }) => {
	const [color, setColor] = useState("w");
	const [active, setActive] = useState("");

	const highLighted = state => {
		return color === state ? iconColor() : null;
	};

	const iconColor = () => {
		const style = getComputedStyle(document.body);

		return color === "b"
			? `rgb(${style.getPropertyValue("--nc-black")})`
			: `rgb(${style.getPropertyValue("--nc-white")})`;
	};

	const onPost = async () => {
		try {
			setActive("active");
			await postGame(color);
			setActive("");
			setOpen(false);
		} catch (e) {
			console.log(e);
			setActive("");
		}
	};

	return (
		<Modal
			closeOnDimmerClick
			basic
			onClose={() => setOpen(false)}
			open={open}
			className="new-game-modal new game modal"
		>
			<Card className="new game modal">
				<div style={{ position: "relative" }}>
					<div className={`ui ${active} inverted dimmer`}>
						<div className="ui loader"></div>
					</div>
					<div id="first-grid" className="ui center aligned grid">
						<div id="first-row" className="grid middle aligned row">
							<h3 className="ui header">New game</h3>
						</div>
						<div id="second-row" className="grid middle aligned row">
							<span>Play as</span>
						</div>

						<div id="first-divider" className="ui divider"></div>

						<div id="third-row" className="grid middle aligned row">
							<div className="flex center full height">
								<i className="icons">
									<i id="outer" className="circle fitted icon"></i>
									<i
										id="inner"
										className="chess queen fitted icon"
										style={{ color: iconColor() }}
									></i>
								</i>
							</div>
						</div>
						<div id="second-divider" className="ui divider"></div>
						<div id="fourth-row" className="grid middle aligned row">
							<div className="ui horizontal list">
								<div className="item">
									<label
										className={`ui large fluid basic label clickable`}
										onClick={() => setColor("w")}
										style={{
											color: highLighted("w"),
											borderColor: highLighted("w")
										}}
									>
										White
									</label>
								</div>
								<div className="item">
									<label
										className={`ui large fluid basic label clickable`}
										onClick={() => setColor("b")}
										style={{
											color: highLighted("b"),
											borderColor: highLighted("b")
										}}
									>
										Black
									</label>
								</div>
							</div>
						</div>

						<div id="third-divider" className="ui divider"></div>
						<div id="fifth-row" className="grid middle aligned row">
							<button
								className="ui basic green compact button"
								onClick={() => onPost()}
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

export default NewGameModal;
