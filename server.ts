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
			// console.log(connection);
			return connection.context;
		} else {
			let isAuthenticated = false;
			const token = req.headers.authorization || "";
			// console.log(token);
			if (token !== "") {
				try {
					const { error, decoded } = await isTokenValid(token);
					if (error) throw new Error(error);

					isAuthenticated = true;
					// console.log(token);
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
	const domain = process.env.DOMAIN || "localhost";
	const PORT = process.env.PORT || 3001;
	const clientPort = process.env.CLIENT_PORT || 3000;

	const corsOptions = {
		origin: `http://${domain}:${clientPort}`,
		credentials: true,
	};

	const app = express();
	app.use(cors(corsOptions));
	app.disable("x-powered-by");
	app.set("port", 3000);

	// Handle React Deploy Routing
	app.use(express.static(path.join(__dirname, "frontend/build")));
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname + "/frontend/build/index.html"));
	});

	server.applyMiddleware({ app });
	const httpServer = http.createServer(app);
	server.installSubscriptionHandlers(httpServer);

	await connectDB();

	log(`Attemping to bind:${domain}:${PORT}`);

	httpServer.listen(PORT, () => {
		log(
			`🚀 HTTP Server ready at http://${domain}:${PORT}${server.graphqlPath}`
		);
	});
};

startServer();
