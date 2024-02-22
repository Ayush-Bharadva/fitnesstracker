import ReactLoading from "react-loading";
import "./Loader.scss";

function Loader() {
	return (
		<div className="loader-container">
			<ReactLoading
				type="spin"
				color="#40d8c4"
				height="64px"
				width="64px"
				className="loader"
			/>
		</div>
	);
}

export default Loader;
