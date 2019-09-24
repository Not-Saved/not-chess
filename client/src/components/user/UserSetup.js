import React, { useContext, useState } from "react";
import { withRouter } from "react-router-dom";

import { UserContext } from "context";
import Card from "components/Card";
import "styles/home.css";
import { Popup, Input } from "semantic-ui-react";
import UserIcons from "./UserIcons";

const UserSetup = ({ history }) => {
	const { user, postUser } = useContext(UserContext);
	const [icon, setIcon] = useState("patrick.png");
	const [name, setName] = useState(user.userName);

	return (
		<div className="main page container">
			<div className="main page content login">
				<Card>
					<div style={{ padding: "15px 15px 10px 15px" }}>
						<h1 className="ui header">
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
						<div
							className="ui divider"
							style={{ marginTop: 0 }}
						></div>

						<div
							className="ui horizontal list"
							style={{ margin: 0 }}
						>
							<Popup
								trigger={
									<img
										src={`/${icon}`}
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
								on={"click"}
								hoverable
							>
								<UserIcons
									onClick={e => setIcon(e.target.name)}
								/>
							</Popup>
							<div
								className="item"
								style={{
									width: "60%",
									height: "100%"
								}}
							>
								<Input
									type="text"
									placeholder="Username"
									value={name}
									onChange={e => setName(e.target.value)}
									style={{
										fontSize: "14px",
										width: "100%"
									}}
								/>
							</div>
						</div>

						<div className="ui divider"></div>
						<div>
							<button
								className="ui fitted positive basic small button"
								onClick={async () => {
									try {
										await postUser({
											userName: name,
											icon: icon
										});
										history.push("/");
									} catch (e) {
										console.log(e);
									}
								}}
							>
								<i className="check icon"></i>
								Confirm
							</button>
						</div>
					</div>
				</Card>
			</div>
		</div>
	);
};

export default withRouter(UserSetup);
