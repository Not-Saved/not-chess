import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";

const Menu = ({ location }) => {
	const [active, setActive] = useState(location.pathname);

	useEffect(() => {
		setActive(location.pathname);
	}, [location.pathname]);

	const isActive = string => {
		return active.split("/")[1] === string ? "active" : "";
	};

	return (
		<div className="ui secondary pointing huge menu">
			<Link to="/" className={`${isActive("")} item`}>
				<i className="home menu icon"></i>
				<span className="menu text">Home</span>
			</Link>
			<Link to="/chess" className={`${isActive("chess")} item`}>
				<i className="chess menu icon"></i>
				<span className="menu text">Chess</span>
			</Link>
			<div className="right menu">
				<Link to="/logout" className={`${isActive("logout")} item`}>
					<i className="sign-out menu icon"></i>
					<span className="menu text">Logout</span>
				</Link>
			</div>
		</div>
	);
};

export default withRouter(Menu);
