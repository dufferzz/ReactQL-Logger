import { useEffect } from "react";
import { withRouter } from "react-router-dom";

function ScrollToTop({ history }: any) {
	useEffect(() => {
		const unlisten = history.listen(() => {
			window.scrollTo({
				top: 0,
				behavior: "smooth",
			});
		});
		return () => {
			unlisten();
		};
	}, [history]);

	return null;
}

export default withRouter(ScrollToTop);
