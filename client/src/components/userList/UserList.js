import React from "react";

import "./userList.css";
import Card from "components/Card";

const UserList = ({ users }) => {
	const scoreCard = user =>
		window.innerWidth <= 750 ? (
			<ScoreCardMobile key={user.userName} user={user} />
		) : (
			<ScoreCard key={user.userName} user={user} />
		);

	return (
		<div className="user list">
			<div className="ui centered container text">
				<h3 className="header">
					<i className="trophy icon"></i>
					<span>Leaderboard</span>
				</h3>
				<div className="ui divider"></div>
				<div className="scrolling scrollbar hidden">
					{users.map(user => scoreCard(user))}
				</div>
			</div>
		</div>
	);
};

const ScoreCard = ({ user }) => {
	return (
		<Card className="score card">
			<div className="card grid">
				<div className="item player name">
					<h2 className="ui center aligned icon">
						<div className="container">
							<img
								src={`/${user.icon}`}
								className="ui circular image"
								alt=""
							/>
						</div>
						<span className="text">
							<label className="ui basic compact label black">
								{user.userName}
							</label>
						</span>
					</h2>
				</div>
				<div className="item stat">
					<div className="container">
						<h2 className="ui header">{user.won.checkmate}</h2>
					</div>
					<span className="type">
						<label className="ui basic compact label green">Checkmate</label>
					</span>
				</div>

				<div className="item stat">
					<div className="container">
						<h2 className="ui header">{user.won.resign}</h2>
					</div>
					<span className="type">
						<label className="ui basic compact label green">Resign</label>
					</span>
				</div>

				<div className="item stat">
					<div className="container">
						<h2 className="ui header">{user.draw.stalemate}</h2>
					</div>
					<span className="type">
						<label className="ui basic compact label grey">Draw</label>
					</span>
				</div>

				<div className="item stat">
					<div className="container">
						<h2 className="ui header">{user.lost.checkmate}</h2>
					</div>
					<span className="type">
						<label className="ui basic compact label red">Checkmate</label>
					</span>
				</div>

				<div className="item stat">
					<div className="container">
						<h2 className="ui header">{user.lost.resign}</h2>
					</div>
					<span className="type">
						<label className="ui basic compact label red">Resign</label>
					</span>
				</div>
			</div>
		</Card>
	);
};

const ScoreCardMobile = ({ user }) => {
	return (
		<Card className="score card">
			<div className="card grid mobile">
				<div className="item player name">
					<h2 className="ui center aligned icon">
						<div className="container">
							<img
								src={`/${user.icon}`}
								className="ui circular image"
								alt=""
							/>
						</div>
						<span className="text">
							<label className="ui basic compact label black">
								{user.userName}
							</label>
						</span>
					</h2>
				</div>
				<div className="item stat">
					<div className="container">
						<h2 className="ui header">
							{user.won.checkmate + user.won.resign}
						</h2>
					</div>
					<span className="type">
						<label className="ui basic compact label green">Win</label>
					</span>
				</div>

				<div className="item stat">
					<div className="container">
						<h2 className="ui header">{user.draw.stalemate}</h2>
					</div>
					<span className="type">
						<label className="ui basic compact label grey">Draw</label>
					</span>
				</div>

				<div className="item stat">
					<div className="container">
						<h2 className="ui header">
							{user.lost.checkmate + user.lost.resign}
						</h2>
					</div>
					<span className="type">
						<label className="ui basic compact label red">Lost</label>
					</span>
				</div>
			</div>
		</Card>
	);
};

export default UserList;
