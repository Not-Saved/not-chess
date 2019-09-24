import React from "react";

import Card from "components/Card";
import "styles/home.css";

const Home = () => {
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
