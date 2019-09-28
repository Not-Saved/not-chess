import React from "react";
import "../styles/card.css";

const Card = ({ children, className, style }) => {
	return (
		<div className={`nc-card ${className}`} style={style}>
			<div className="nc-corners">{children}</div>
		</div>
	);
};

export default Card;
