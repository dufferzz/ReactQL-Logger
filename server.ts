import { mergeSchemas } from "graphql-tools";

import { ApolloServer } from "apollo-server-express";
import { connectDB } from "./src/db";
import { log } from "./src/utils/logger";
import isTokenValid from "./src/utils/validate";

import express from "express";
import http from "http";
import cors from "cors";

import path from "path";

import resolvers from "./src/resolvers";
import schemas from "./src/schemas";
require("dotenv").config();

const schema = mergeSchemas({
	schemas,
	resolvers,
});

const server = new ApolloServer({
	schema,
	context: async ({ req, connection }: any) => {
		if (connection) {
			return connection.context;
		} else {
			let isAuthenticated = false;
			const token = req.headers.authorization || "";
			if (token !== "") {
				try {
					const { error, decoded } = await isTokenValid(token);
					if (error) throw new Error(error);
					if (decoded) isAuthenticated = true;
					return {
						isAuthenticated,
						decoded,
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
	const PORT = process.env.PORT || 3001;
	const CLIENT_URL = process.env.CLIENT_URL;

	const corsOptions = {
		origin: CLIENT_URL,
		credentials: true,
	};

	const app = express();

	app.use(cors(corsOptions));
	app.disable("x-powered-by");

	server.applyMiddleware({ app });

	const httpServer = http.createServer(app);
	server.installSubscriptionHandlers(httpServer);

	await connectDB();

	httpServer.listen(PORT, () => {
		log(`🚀 GQL Server ready at ::${PORT}${server.graphqlPath}`);
	});
};

startServer();
