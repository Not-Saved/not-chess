import React from "react";
import "../styles/card.css";

const Card = ({ children }) => {
	return (
		<div className="nc-card">
			<div className="nc-corners">{children}</div>
		</div>
	);
};

export default Card;
