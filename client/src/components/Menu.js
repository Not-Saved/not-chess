import React, { useState, useEffect, useContext } from "react";
import { withRouter, Link } from "react-router-dom";

import { UserContext } from "context";
import useRedirect from "util/useRedirect";

const Menu = ({ location, history }) => {
	const [active, setActive] = useState(location.pathname);
	const { user, logout } = useContext(UserContext);
	useRedirect(location.pathname, history);
	useEffect(() => {
		setActive(location.pathname);
	}, [location.pathname]);

	const isActive = string => {
		return active.split("/")[1] === string ? "active" : "";
	};

	const renderLogout = () => {
		if (user) {
			return (
				<div
					onClick={logout}
					className={`item`}
					style={{ cursor: "pointer" }}
				>
					<i className="sign-out menu fitted icon"></i>
					<span className="menu text">Logout</span>
				</div>
			);
		}
		return null;
	};

	return (
		<div className="ui secondary pointing huge menu" style={{ margin: 0 }}>
			<Link
				to="/"
				className={`${isActive("")} ${isActive("login")} 
					${isActive("setup")} item`}
			>
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
