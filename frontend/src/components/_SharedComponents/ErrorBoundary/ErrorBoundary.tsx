import React from "react";
class ErrorBoundary extends React.Component<{}, any> {
	constructor(props: any) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: any) {
		return { hasError: true };
	}

	componentDidCatch(error: any, errorInfo: any) {
		console.error(error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return <h1 style={{ fontSize: "2rem" }}>🥺</h1>;
		}

		return this.props.children;
	}
}
export default ErrorBoundary;
