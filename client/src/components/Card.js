import React from "react";
import "./card.css";

const Card = ({ children, className = "", style = {}, innerStyle = {} }) => {
	return (
		<div className={`${className} main card`} style={style}>
			<div className="corners" style={innerStyle}>
				{children}
			</div>
		</div>
	);
};

export default Card;
