import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { configureStore } from "@reduxjs/toolkit";
import combinedReducers from "./features";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";
import AuthorizedApolloProvider from "./providers/AuthorizedApolloProvider";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const store = configureStore({
	reducer: combinedReducers,
});

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Auth0Provider
				domain="dfz.eu.auth0.com"
				clientId="xmd2O7HE8yuZUhh50XLG7rluouHDtWVM"
				redirectUri={window.location.origin}
			>
				<AuthorizedApolloProvider>
					<App />
				</AuthorizedApolloProvider>
			</Auth0Provider>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);

reportWebVitals();
