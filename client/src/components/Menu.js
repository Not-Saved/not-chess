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

	const renderLogout = () => {
		if (true) {
			return (
				<Link to="/logout" className={`${isActive("logout")} item`}>
					<i className="sign-out menu fitted icon"></i>
					<span className="menu text">Logout</span>
				</Link>
			);
		}
		return null;
	};

	return (
		<div className="ui secondary pointing huge menu" style={{ margin: 0 }}>
			<Link to="/" className={`${isActive("")} item`}>
				<i className="home menu fitted icon"></i>
				<span className="menu text">Home</span>
			</Link>
			<Link to="/games" className={`${isActive("games")} item`}>
				<i className="chess menu fitted icon"></i>
				<span className="menu text">Games</span>
			</Link>
			<div className="right menu">{renderLogout()}</div>
		</div>
	);
};

export default withRouter(Menu);
