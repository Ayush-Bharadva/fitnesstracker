import React from "react";
import "./Home.scss";
import "../../global.scss";
import video from "../../assets/hero_assets/gym-video.mp4";

function Home() {
	return (
		<>
			<section id="banner-section">
				<video src={video} autoPlay muted loop id="bg-video"></video>
				<div className="video-overlay header-text">
					<div className="caption">
						<h5>WORK HARDER, GET STRONGER</h5>
						<h2>
							EASY WITH OUR <span> Fitness Tracker </span>
						</h2>
						<div className="main-button">
							<button>Start Tracking</button>
						</div>
					</div>
				</div>
			</section>
			<section id="info-section"></section>
			<section id="quote-section"></section>
			<section id="services-section"></section>
		</>
	);
}

export default Home;
