import {
	ApolloClient,
	ApolloProvider,
	InMemoryCache,
	split,
	HttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/link-context";
import React from "react";
import { WebSocketLink } from "@apollo/client/link/ws";
import config from "../config/config";

import { getMainDefinition } from "@apollo/client/utilities";
import { useAuth0 } from "@auth0/auth0-react";

//TODO: vvvvvvvvvvv fix any type
const AuthorizedApolloProvider = ({ children }: any) => {
	const { getAccessTokenSilently } = useAuth0();

	// Get our Auth0 token and return valid header
	const authLink = setContext(async () => {
		const token = await getAccessTokenSilently({
			audience: `https://api.dufferz.net`,
		});
		return {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
	});

	// Initialise our links
	const httpLink = new HttpLink({
		uri: config.apolloHttpUrl,
	});
	const wsLink = new WebSocketLink({
		uri: config.apolloWSUrl,
		options: {
			reconnect: true,
		},
	});

	// Split our link requests by type for WS Subscriptions

	const splitLink = split(
		({ query }) => {
			const definition = getMainDefinition(query);
			return (
				definition.kind === "OperationDefinition" &&
				definition.operation === "subscription"
			);
		},
		wsLink,
		authLink.concat(httpLink) // Bind our auth headers to the httplink
	);

	const apolloClient = new ApolloClient({
		link: splitLink,
		cache: new InMemoryCache(),
		connectToDevTools: true,
	});

	return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default AuthorizedApolloProvider;
