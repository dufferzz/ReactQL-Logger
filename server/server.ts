import express from "express";
import { mergeSchemas } from "graphql-tools";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";

import { connectDB } from "./src/db";
import { log } from "./src/utils/logger";
import isTokenValid from "./src/utils/validate";
import http from "http";

import resolvers from "./src/resolvers";

import schemas from "./src/schemas";
import LogRocket from "logrocket";
LogRocket.init("nao4j2/dfz-store");

require("dotenv").config();
const schema = mergeSchemas({
	schemas,
	resolvers,
});

const server = new ApolloServer({
	schema,
	//TODO: vvvvvvvvvvvvv
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

					isAuthenticated = true;
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
	var corsOptions = {
		origin: "http://localhost:3000",
		credentials: true,
	};

	const app = express();
	app.use(cors(corsOptions));
	server.applyMiddleware({ app });

	const httpServer = http.createServer(app);
	server.installSubscriptionHandlers(httpServer);

	await connectDB();

	const port = process.env.PORT || 3001;

	httpServer.listen(port, () => {
		log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
	});
};
startServer();
