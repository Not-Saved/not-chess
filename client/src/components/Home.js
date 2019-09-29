import React, { useContext } from "react";

import { UserContext } from "context";
import Card from "components/Card";
import "styles/home.css";
import Loading from "./Loading";

const Home = () => {
	const { user } = useContext(UserContext);
	if (user && !user.setUp) {
		return <Loading />;
	}
	return (
		<div className="main page container">
			<div className="main page content">
				<Card>
					<div style={{ padding: 15, marginTop: 9 }}>
						<h1 className="ui icon header">
							<i className="	settings icon"></i>
							<div className="content">
								Welcome back!
								<div className="sub header">
									Work in progress...
								</div>
							</div>
						</h1>
					</div>
				</Card>
			</div>
		</div>
	);
};

export default Home;
