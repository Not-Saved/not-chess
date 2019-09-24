import React from "react";

import Card from "components/Card";
import "styles/home.css";

const Login = () => {
	return (
		<div className="main page container">
			<div className="main page content login">
				<Card>
					<div style={{ padding: 15 }}>
						<h1 className="ui icon header">
							<i className="user circle fitted icon"></i>
							<div className="content">
								<div>Login</div>
								<div
									className="sub header"
									style={{ margin: "0px 40px" }}
								>
									To authenticate please use one of the
									following options.
								</div>
							</div>
						</h1>
						<div
							className="ui divider"
							style={{ marginTop: 0 }}
						></div>
						<div>
							<button
								className="ui big google plus button"
								onClick={() =>
									(window.location.href = "/auth/google")
								}
							>
								<i className="google icon"></i>
								Log-in with Google
							</button>
						</div>
						<div className="ui divider"></div>
						<h1 className="ui header" style={{ marginTop: 0 }}>
							<div
								className="sub header"
								style={{ margin: "0px 5px" }}
							>
								No personal information from the above services
								will be used in this application.
							</div>
						</h1>
					</div>
				</Card>
			</div>
		</div>
	);
};

export default Login;