import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Popup, Input } from "semantic-ui-react";

import Card from "components/Card";
import UserIcons from "./UserIcons";
import "./userSetup.css";

const UserSetup = ({ history, values, errors, dirty, validating, onChange, postUser }) => {
	const [active, setActive] = useState("");

	const onSubmit = async () => {
		try {
			setActive("active");
			await postUser({
				userName: values.userName,
				icon: values.icon,
			});
			setActive("");
			history.push("/");
		} catch (e) {
			console.error(e);
			setActive("");
		}
	};

	const renderHeader = () => {
		return (
			<h1 className="ui header">
				<div className="text">
					<div>Tell us about yourself!</div>
				</div>
				<div className="sub header">Please choose a username and an icon.</div>
			</h1>
		);
	};

	const renderInfo = () => {
		const popupPosition = window.innerWidth > 450 ? "right center" : "top left";

		return (
			<div className="ui horizontal list">
				<div className="left item">
					<Popup
						position={popupPosition}
						hoverable
						on={"click"}
						trigger={<img src={`/${values.icon}`} className="ui circular image clickable" alt="" />}
						popperDependencies={[window.innerHeight]}
						style={{ zIndex: 1901 }}
					>
						<UserIcons onClick={(e) => onChange(e)} />
					</Popup>
				</div>
				<div className="right item">
					<Popup
						className="error popup"
						position="bottom left"
						offset={[0, -7]}
						trigger={
							<Input
								type="text"
								name="userName"
								placeholder="Username"
								error={Boolean(errors.userName && dirty)}
								value={String(values.userName)}
								onChange={onChange}
							/>
						}
						content={errors.userName}
						open={Boolean(errors.userName && dirty)}
						popperDependencies={[window.innerHeight]}
					></Popup>
				</div>
			</div>
		);
	};

	const renderButton = () => {
		const buttonClassName = () => {
			if (Object.values(errors).length && !validating) {
				return "ui fitted basic negative disabled small button";
			} else if (validating) {
				return "ui fitted basic disabled small button";
			} else {
				return "ui fitted basic positive small button";
			}
		};

		const buttonIconClassName = () => {
			if (Object.values(errors).length && !validating) {
				return "x icon";
			} else if (validating) {
				return "loading circle notch icon";
			} else {
				return "check icon";
			}
		};

		return (
			<button className={buttonClassName()} onClick={onSubmit}>
				<i className={buttonIconClassName()}></i>
				Confirm
			</button>
		);
	};

	return (
		<div className="flex center full width height">
			<div className="user setup">
				<Card innerStyle={{ padding: 2 }}>
					<div className="content">
						<div className={`ui ${active} inverted dimmer`}>
							<div className="ui loader"></div>
						</div>
						{renderHeader()}
						<div className="ui divider"></div>
						{renderInfo()}
						<div className="ui divider"></div>
						{renderButton()}
					</div>
				</Card>
			</div>
		</div>
	);
};

export default withRouter(UserSetup);
