require("dotenv").config();
const express = require("express");
const { makeExecutableSchema } = require("graphql-tools");
const cors = require("cors");
const { ApolloServer, PubSub } = require("apollo-server-express");

const { connectDB } = require("./src/db");
const { log } = require("./src/utils/logger");
const isTokenValid = require("./src/utils/validate");

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
			console.log("ws connection?");
			return connection.context;
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
	subscriptions: {
		onConnect: (connectionParams, webSocket) => {
			console.log("ws connection");
		},
	},
});

var corsOptions = {
	origin: "http://localhost:3001",
	credentials: true,
};

const app = express();

server.applyMiddleware({ app });
app.use(cors(corsOptions));

const startServer = async () => {
	var start = new Date();
	await connectDB();

	const port = process.env.PORT || 3001;

	app.listen(port, () => {
		var end = new Date() - start;
		log(
			`🚀 Server ready at http://localhost:${port}${server.graphqlPath} - Init: ${end}ms`
		);
	});
};
startServer();
