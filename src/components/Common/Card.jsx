import React from "react";
import "./Card.scss";

function Card({ children }) {
	return <div className="card">{children}</div>;
}

export default Card;
