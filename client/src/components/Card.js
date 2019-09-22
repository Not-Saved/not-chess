import React from "react";
import "../styles/card.css";

const Card = ({ children, className }) => {
	return (
		<div className={`nc-card ${className}`}>
			<div className="nc-corners">{children}</div>
		</div>
	);
};

export default Card;
