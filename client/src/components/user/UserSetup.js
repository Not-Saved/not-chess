import React, { useContext } from "react";
import { withRouter } from "react-router-dom";

import { UserContext } from "context";
import Card from "components/Card";
import "styles/home.css";
import { Popup, Input } from "semantic-ui-react";
import UserIcons from "./UserIcons";
import useForm from "util/useForm";

const UserSetup = ({ history }) => {
	const { user, postUser } = useContext(UserContext);
	const { values, errors, onChange, dirty } = useForm({
		initialValues: {
			userName: user.userName,
			icon: user.icon
		},
		defaultValues: {
			userName: "",
			icon: "patrick.png"
		},
		validate: values => {
			let errors = {};
			if (!values.userName) errors.userName = "Can't be empty";
			if (values.userName && values.userName.length < 4)
				errors.userName = "Username too short";
			if (values.userName && values.userName.length > 10)
				errors.userName = "Username too long";
			if (!/^[a-zA-Z]/.test(values.userName))
				errors.userName = "Must start with a letter";
			return errors;
		}
	});

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
								on={"click"}
								hoverable
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
											error={Boolean(
												errors.userName && dirty
											)}
											value={values.userName}
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
						<div>
							<button
								className={`ui fitted basic small ${
									Object.entries(errors).length
										? "negative disabled"
										: "positive"
								} button`}
								onClick={async () => {
									try {
										await postUser({
											userName: values.userName,
											icon: values.icon
										});
										history.push("/");
									} catch (e) {
										console.log(e);
									}
								}}
							>
								<i
									className={`${
										Object.entries(errors).length
											? "x"
											: "check"
									} icon`}
								></i>
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
