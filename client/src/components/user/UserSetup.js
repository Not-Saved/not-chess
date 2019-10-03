import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Popup, Input } from "semantic-ui-react";

import Card from "components/Card";
import UserIcons from "./UserIcons";
import "styles/home.css";

const UserSetup = ({
	history,
	values,
	errors,
	dirty,
	validating,
	onChange,
	postUser
}) => {
	const [active, setActive] = useState("");

	const renderInfo = () => {
		return (
			<>
				<div className="ui divider" style={{ marginTop: 0 }}></div>
				<div className="ui horizontal list" style={{ margin: 0 }}>
					<Popup
						trigger={
							<img
								src={`/${values.icon}`}
								className="ui circular image item"
								alt=""
								style={{
									height: 69,
									width: 69,
									padding: 0,
									cursor: "pointer"
								}}
							/>
						}
						position={
							window.innerWidth > 450
								? "right center"
								: "top left"
						}
						popperDependencies={[window.innerHeight]}
						on={"click"}
						hoverable
						style={{ zIndex: 1901 }}
					>
						<UserIcons onClick={e => onChange(e)} />
					</Popup>
					<div
						className="item"
						style={{
							width: "60%",
							height: "100%"
						}}
					>
						<Popup
							trigger={
								<Input
									type="text"
									name="userName"
									placeholder="Username"
									error={Boolean(errors.userName && dirty)}
									value={String(values.userName)}
									onChange={onChange}
									style={{
										fontSize: "14px",
										width: "100%"
									}}
								/>
							}
							open={Boolean(errors.userName && dirty)}
							content={errors.userName}
							position={"bottom left"}
							offset="0px,-7px"
							className="error popup"
							popperDependencies={[window.innerHeight]}
						></Popup>
					</div>
				</div>
				<div className="ui divider"></div>
			</>
		);
	};

	const renderButton = () => {
		return (
			<button
				className={(function() {
					if (Object.values(errors).length && !validating)
						return "ui fitted basic negative disabled small button";
					else if (validating)
						return "ui fitted basic disabled small button";
					else return "ui fitted basic positive small button";
				})()}
				onClick={async () => {
					try {
						setActive("active");
						await postUser({
							userName: values.userName,
							icon: values.icon
						});
						setActive("");
						history.push("/");
					} catch (e) {
						console.log(e);
						setActive("");
					}
				}}
			>
				<i
					className={(function() {
						if (Object.values(errors).length && !validating)
							return "x icon";
						else if (validating) return "loading circle notch icon";
						else return "check icon";
					})()}
				></i>
				Confirm
			</button>
		);
	};

	if (window.innerHeight < 260) {
		return (
			<div className="foreground" style={{ textAlign: "center" }}>
				<div>{renderInfo()}</div>
				<div>{renderButton()}</div>
				<div className="ui divider"></div>
			</div>
		);
	}
	return (
		<div className="main page container">
			<div className="main page content login">
				<Card cornerStyle={{ padding: 2 }} style={{ margin: 0 }}>
					<div
						style={{
							padding: "15px 15px 10px 15px",
							position: "relative"
						}}
					>
						<div
							className={`ui ${active} inverted dimmer`}
							style={{ zIndex: 9 }}
						>
							<div className="ui loader"></div>
						</div>
						<h1
							className="ui header"
							style={{ margin: 0, marginBottom: "10px" }}
						>
							<div
								className="content"
								style={{ marginBottom: "10px" }}
							>
								<div>Tell us about yourself!</div>
							</div>
							<div
								className="sub header"
								style={{ margin: "0px 5px" }}
							>
								Please choose a username and an icon.
							</div>
						</h1>
						{renderInfo()}
						<div>{renderButton()}</div>
					</div>
				</Card>
			</div>
		</div>
	);
};

export default withRouter(UserSetup);
