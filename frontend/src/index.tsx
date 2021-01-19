import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import { configureStore } from "@reduxjs/toolkit";
import { Provider, useDispatch } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";
import AuthorizedApolloProvider from "./providers/AuthorizedApolloProvider";
import combinedReducers from "./features";

import config from "./config/config";

const store = configureStore({
	reducer: combinedReducers,
});

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Auth0Provider
				domain={config.auth0Domain}
				clientId={config.auth0ClientID}
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
serviceWorkerRegistration.unregister();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
