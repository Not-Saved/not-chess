import React, { useContext } from "react";

import { UserContext } from "context";
import Card from "components/Card";
import "styles/home.css";
import { Popup } from "semantic-ui-react";

const UserSetup = () => {
	const { user } = useContext(UserContext);

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				textAlign: "center",
				height: "100%"
			}}
		>
			<div className="main page login">
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
								To start using the application please choose a
								username and an icon.
							</div>
						</h1>
						<div
							className="ui divider"
							style={{ marginTop: 0 }}
						></div>

						<h5 className="ui header" style={{ margin: 0 }}>
							<Popup
								trigger={
									<img
										src="/patrick.png"
										className="ui circular image"
										alt=""
										style={{
											height: 69,
											width: 69,
											margin: "0px 5% 0px 0px"
										}}
									/>
								}
								position="top left"
								hoverable
							>
								<div style={{ width: "200px", height: "60px" }}>
									Hello
								</div>
							</Popup>

							<div
								className="ui input"
								style={{
									fontSize: 14,
									width: "60%"
								}}
							>
								<input type="text" placeholder="Username" />
							</div>
						</h5>

						<div className="ui divider"></div>
						<div>
							<button className="ui fitted positive basic small button">
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

export default UserSetup;
