import React from "react";

const Empty = ({ text }) => {
	return (
		<div className="flex center full height width">
			<h2 className="ui icon header">
				<i className="coffee icon"></i>
				<div className="content">
					Nothing Here
					<div className="sub header">{text}</div>
				</div>
			</h2>
		</div>
	);
};

export default Empty;
