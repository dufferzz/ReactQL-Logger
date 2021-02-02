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

const SWConfig = {
	onUpdate: (registration: ServiceWorkerRegistration) => {
		console.log("update!");
		// store.dispatch('')
		const waitingServiceWorker = registration.waiting;

		if (waitingServiceWorker) {
			waitingServiceWorker.addEventListener("statechange", (event: any) => {
				if (event.target && event.target.state === "activated") {
					//   store.dispatch(updateReady())
					console.log("ergregergerg");
				}
			});
		}
	},
	onSuccess: (registration: ServiceWorkerRegistration) => {
		console.log("success!");
	},
};

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
serviceWorkerRegistration.register(SWConfig);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
