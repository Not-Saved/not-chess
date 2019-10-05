import React, { useState, useEffect, useContext } from "react";
import { withRouter, Link } from "react-router-dom";

import useRedirect from "util/useRedirect";
import { UserContext } from "context";

import UserPopup from "./UserPopup";

import "./menu.css";

const Menu = ({ location, history }) => {
	const { user, logout } = useContext(UserContext);
	const [active, setActive] = useState(location.pathname);
	useRedirect(location.pathname, history);

	useEffect(() => {
		setActive(location.pathname);
	}, [location.pathname]);

	const isActive = activeWhen => {
		if (Array.isArray(activeWhen)) {
			return activeWhen.find(el => el === active) ? "active" : "";
		} else {
			return active === activeWhen ? "active" : "";
		}
	};

	const onLogout = async () => {
		await logout();
		history.push("/login");
	};

	const renderRightItem = () => {
		const logoutItem = (
			<div onClick={onLogout} className="item">
				<i className="sign-out fitted icon"></i>
				<span className="text">Logout</span>
			</div>
		);

		const loginItem = (
			<div
				onClick={() => history.push("/login")}
				className={`${isActive("/login")} item`}
			>
				<i className="sign-in fitted icon"></i>
				<span className="text">Login</span>
			</div>
		);

		if (user && user.setUp) {
			return <UserPopup history={history} onLogout={onLogout} user={user} />;
		} else if (user) {
			return logoutItem;
		} else {
			return loginItem;
		}
	};

	return (
		<div className="menu container">
			<div className="ui secondary pointing menu">
				<Link to="/" className={`${isActive(["/", "/user/settings"])} item`}>
					<i className="home fitted icon"></i>
					<span className="text">Home</span>
				</Link>

				<Link to="/games" className={`${isActive("/games")} item`}>
					<i className="chess fitted icon"></i>
					<span className="text">Games</span>
				</Link>

				<div className="right menu">{renderRightItem()}</div>
			</div>
		</div>
	);
};

export default withRouter(Menu);
