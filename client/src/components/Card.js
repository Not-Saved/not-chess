import React from "react";
import "../styles/card.css";

const Card = ({ children, className = "", style, cornerStyle }) => {
	return (
		<div className={`nc-card ${className}`} style={style}>
			<div className="nc-corners" style={cornerStyle}>
				{children}
			</div>
		</div>
	);
};

export default Card;
