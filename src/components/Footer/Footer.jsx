import "./Footer.scss";

function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="footer">
			<p className="footer-content">© {currentYear} FitnessTracker. All Rights Reserved.</p>
		</footer>
	);
}

export default Footer;
