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
			<h1 class="ui icon header">
				<i class="	settings icon"></i>
				<div class="content">
					Welcome back!
					<div class="sub header">Work in progress...</div>
				</div>
			</h1>
		</div>
	);
};

export default Home;
