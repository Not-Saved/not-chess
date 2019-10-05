import React, { useContext } from "react";

import { UserContext } from "context";

import Card from "components/Card";
import Loading from "./Loading";

import "./home.css";

const Home = () => {
	const { user } = useContext(UserContext);
	if (user && !user.setUp) {
		return <Loading />;
	}
	return (
		<div className="flex center full height">
			<div className="home">
				<Card>
					<div className="content">
						<h1 className="ui icon header">
							<i className="settings icon"></i>
							<div className="content">
								Welcome back!
								<div className="sub header">Work in progress...</div>
							</div>
						</h1>
					</div>
				</Card>
			</div>
		</div>
	);
};

export default Home;
