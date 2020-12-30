require("dotenv").config();
const express = require("express");
const { makeExecutableSchema } = require("graphql-tools");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const { PubSub } = require("graphql-subscriptions");

const { connectDB } = require("./src/db");
const { log } = require("./src/utils/logger");
const isTokenValid = require("./src/utils/validate");
const http = require("http");

const resolvers = require("./src/resolvers");
const typeDefs = require("./src/typedefs");

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

const pubsub = new PubSub();

const server = new ApolloServer({
	schema,
	context: async ({ req, connection }) => {
		if (connection) {
			const context = connection.context;
			return { context, pubsub };
		} else {
			let isAuthenticated = false;
			const token = req.headers.authorization || "";

			if (token !== "") {
				try {
					const { error } = await isTokenValid(token);

					if (error) {
						throw new Error(error);
					}
					isAuthenticated = true;
					return {
						isAuthenticated,
						pubsub,
					};
				} catch (err) {
					isAuthenticated = false;
					console.log(err);
					return "";
				}
			}
		}
	},
});

const startServer = async () => {
	var corsOptions = {
		origin: "http://localhost:3000",
		credentials: true,
	};

	const app = express();
	app.use(cors(corsOptions));
	server.applyMiddleware({ app });

	const httpServer = http.createServer(app);
	server.installSubscriptionHandlers(httpServer);

	const start = new Date();
	await connectDB();

	const port = process.env.PORT || 3001;

	httpServer.listen(port, () => {
		var end = new Date() - start;
		log(
			`🚀 Server ready at http://localhost:${port}${server.graphqlPath} - Init: ${end}ms`
		);
	});
};
startServer();

module.exports = pubsub;
