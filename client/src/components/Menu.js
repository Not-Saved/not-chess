import React, { useState, useEffect, useContext } from "react";
import { withRouter, Link } from "react-router-dom";
import { Popup } from "semantic-ui-react";

import { UserContext } from "context";
import useRedirect from "util/useRedirect";
import UserPopup from "./user/UserPopup";

const Menu = ({ location, history }) => {
	const [active, setActive] = useState(location.pathname);
	const { user, logout } = useContext(UserContext);
	useRedirect(location.pathname, history);
	useEffect(() => {
		setActive(location.pathname);
	}, [location.pathname]);

	const isActive = string => {
		return active === string ? "active" : "";
	};

	const renderLogout = () => {
		if (user && user.setUp) {
			return (
				<Popup
					trigger={
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								textAlign: "center",
								cursor: "pointer"
							}}
						>
							<div
								className="menu text"
								style={{
									height: "100%",
									lineHeight: "50px",
									fontSize: 20
								}}
							>
								{user.userName}
							</div>
							<img
								className="ui circular image"
								src={`/${user.icon}`}
								alt=""
								style={{ height: 38, margin: "0px 10px" }}
							></img>
						</div>
					}
					basic
					hoverable
				>
					<UserPopup history={history} logout={logout} />
				</Popup>
			);
		}
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
		<div className="menu container">
			<div
				className="ui secondary pointing huge menu"
				style={{ margin: 0 }}
			>
				<Link
					to="/"
					className={`${isActive("/")} ${isActive("/login")} 
					${isActive("/user/settings")} item`}
				>
					<i className="home menu fitted icon"></i>
					<span className="menu text">Home</span>
				</Link>
				<Link to="/games" className={`${isActive("/games")} item`}>
					<i className="chess menu fitted icon"></i>
					<span className="menu text">Games</span>
				</Link>
				<div className="right menu">{renderLogout()}</div>
			</div>
		</div>
	);
};

export default withRouter(Menu);
