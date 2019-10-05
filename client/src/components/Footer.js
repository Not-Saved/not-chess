import React from "react";

import "./footer.css";

const Footer = ({ children, className = "", style = {} }) => {
	const renderContent = () => {
		if (children) {
			return children;
		} else {
			return (
				<div className="default full height width">
					<h4 className="ui header">
						<a href="https://github.com/Not-Saved/not-chess">Github</a>
						<i className="github icon"></i>
					</h4>
				</div>
			);
		}
	};

	return (
		<div className={`${className} main footer`} style={style}>
			<div className="content full height width">{renderContent()}</div>
		</div>
	);
};

export default Footer;
