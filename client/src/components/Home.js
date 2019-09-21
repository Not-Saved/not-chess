import React from "react";
import "../styles/home.css";

const Home = () => {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100%"
			}}
		>
			<h1 className="ui icon header">
				<i className="	settings icon"></i>
				<div className="content">
					Welcome back!
					<div className="sub header">Work in progress...</div>
				</div>
			</h1>
		</div>
	);
};

export default Home;
