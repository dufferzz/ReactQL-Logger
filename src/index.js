import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloProvider } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { configureStore } from "@reduxjs/toolkit";
import combinedReducers from "./features";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";

import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";

const httpLink = new HttpLink({
	uri: "http://localhost:3001/graphql",
});

const wsLink = new WebSocketLink({
	uri: `ws://localhost:3001/graphql`,
	options: {
		reconnect: true,
	},
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query);
		return (
			definition.kind === "OperationDefinition" &&
			definition.operation === "subscription"
		);
	},
	wsLink,
	httpLink
);

const client = new ApolloClient({
	// uri: "http://192.168.1.47:3001/graphql",
	link: splitLink,
	cache: new InMemoryCache(),
});
const store = configureStore({
	reducer: combinedReducers,
});

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<Provider store={store}>
				<Auth0Provider
					domain="dfz.eu.auth0.com"
					clientId="xmd2O7HE8yuZUhh50XLG7rluouHDtWVM"
					redirectUri={window.location.origin}
				>
					<App />
				</Auth0Provider>
			</Provider>
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
