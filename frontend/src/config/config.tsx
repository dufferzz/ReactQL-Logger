const config = {
	apolloHttpUrl: "",
	apolloWSUrl: "",
};

if (process.env.NODE_ENV === "development") {
	config.apolloHttpUrl = "http://localhost:3001/graphql";
	config.apolloWSUrl = "ws://localhost:3001/graphql";
} else {
	config.apolloHttpUrl = "https://gql.dufferz.net/graphql";
	config.apolloWSUrl = "wss://gql.dufferz.net/graphql";
}
export default config;
