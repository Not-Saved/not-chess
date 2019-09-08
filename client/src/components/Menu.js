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
				Home
			</Link>
			<Link to="/chess" className={`${isActive("chess")} item`}>
				Chess
			</Link>
			<div className="right menu">
				<Link to="/logout" className={`${isActive("logout")} item`}>
					Logout
				</Link>
			</div>
		</div>
	);
};

export default withRouter(Menu);
