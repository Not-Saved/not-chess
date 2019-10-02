import React from "react";

const Footer = ({ children, className = "", style }) => {
	const renderContent = () => {
		if (children) {
			return children;
		} else {
			return (
				<div className="game list footer" style={{ height: "100%" }}>
					<div
						style={{
							height: "100%",
							width: "100%",
							display: "flex",
							justifyContent: "flex-end",
							alignItems: "center"
						}}
					>
						<div
							style={{
								fontSize: 17,
								fontWeight: "bold",
								marginRight: "15px"
							}}
						>
							<i className="github icon"></i>
							<a
								href="https://github.com/Not-Saved/not-chess"
								style={{ color: "rgb(0,0,0,0.87)" }}
							>
								Github
							</a>
						</div>
					</div>
				</div>
			);
		}
	};

	return (
		<div className={`main footer ${className}`} style={{ ...style }}>
			<div style={{ width: "100%", height: "100%" }}>
				{renderContent()}
			</div>
		</div>
	);
};

export default Footer;
