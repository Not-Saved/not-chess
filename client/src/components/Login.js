import React, { useContext } from "react";

import { UserContext } from "context";

import Card from "components/Card";
import Loading from "components/Loading";

import "./login.css";

const Login = () => {
	const { user } = useContext(UserContext);

	const onGoogleClick = () => {
		window.location.href = "/auth/google";
	};

	if (!user) {
		return (
			<div className="flex center full height">
				<div className="login">
					<Card>
						<div className="content">
							<h1 className="ui icon header">
								<i className="user circle fitted icon"></i>
								<div className="content">
									<div>Login</div>
									<div className="sub header">
										To authenticate please use one of the following
										options.
									</div>
								</div>
							</h1>
							<div className="ui divider"></div>
							<div>
								<button
									className="ui big google plus button"
									onClick={onGoogleClick}
								>
									<i className="google icon"></i>
									Log-in with Google
								</button>
							</div>
							<div className="ui divider"></div>
							<h1 className="ui header">
								<div className="sub header">
									No personal information from the above services will
									be used in this application.
								</div>
							</h1>
						</div>
					</Card>
				</div>
			</div>
		);
	}
	return <Loading />;
};

export default Login;
