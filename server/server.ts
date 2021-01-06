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
import fs from "fs";
import https from "https";
const key = fs.readFileSync("./key.pem");
const cert = fs.readFileSync("./cert.pem");

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
	const port = process.env.PORT || 3001;
	const clientPort = process.env.CLIENT_PORT || 3000;
	const HTTPS = process.env.HTTPS || false;

	var corsOptions = {
		origin:
			HTTPS === "true"
				? `https://localhost:${clientPort}`
				: `http://localhost:${clientPort}`,
		credentials: true,
	};

	const app = express();
	app.use(cors(corsOptions));
	server.applyMiddleware({ app });

	if (HTTPS === "true") {
		const https_server = https.createServer({ key: key, cert: cert }, app);
		server.installSubscriptionHandlers(https_server);
		await connectDB();

		https_server.listen(port, () => {
			log(
				`🚀 HTTPS Server ready at https://localhost:${port}${server.graphqlPath}`
			);
		});
	} else {
		const httpServer = http.createServer(app);

		server.installSubscriptionHandlers(httpServer);
		await connectDB();

		httpServer.listen(port, () => {
			log(
				`🚀 HTTP Server ready at http://localhost:${port}${server.graphqlPath}`
			);
		});
	}
};
startServer();
