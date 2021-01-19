const config = {
	apolloHttpUrl: "",
	apolloWSUrl: "",
	auth0Domain: "dfz.eu.auth0.com",
	auth0ClientID: "xmd2O7HE8yuZUhh50XLG7rluouHDtWVM",
};

if (process.env.NODE_ENV === "development") {
	config.apolloHttpUrl = "http://localhost:3001/graphql";
	config.apolloWSUrl = "ws://localhost:3001/graphql";
} else {
	config.apolloHttpUrl = "https://gql.dufferz.net/graphql";
	config.apolloWSUrl = "wss://gql.dufferz.net/graphql";
}
export default config;
