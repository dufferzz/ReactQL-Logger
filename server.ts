import { mergeSchemas } from "graphql-tools";

import { ApolloServer } from "apollo-server-express";
import { connectDB } from "./src/db";
import { log } from "./src/utils/logger";
import isTokenValid from "./src/utils/validate";

import express from "express";
import http from "http";
import helmet from "helmet";
import cors from "cors";

import path from "path";
import fs from "fs";

import resolvers from "./src/resolvers";
import schemas from "./src/schemas";
import https from "https";

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
	const domain = process.env.DOMAIN || "lvh.me";
	const HTTPS = process.env.HTTPS || true;

	const port = process.env.SERVER_PORT || 3001;
	const clientPort = process.env.CLIENT_PORT || 3000;

	const corsOptions = {
		origin:
			HTTPS === "true"
				? `https://${domain}:${clientPort}`
				: `http://${domain}:${clientPort}`,
		credentials: true,
	};

	const app = express();
	app.use(cors(corsOptions));
	// app.use(helmet());
	app.disable("x-powered-by");

	// Handle React Deploy Routing
	app.use(express.static(path.join(__dirname, "frontend/build")));

	// The "catchall" handler: for any request that doesn't
	// match one above, send back React's index.html file.
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname + "/frontend/build/index.html"));
	});

	server.applyMiddleware({ app });

	if (HTTPS === "true") {
		const https_server = https.createServer(
			{
				key: fs.readFileSync("./key.pem"),
				cert: fs.readFileSync("./cert.pem"),
			},
			app
		);
		server.installSubscriptionHandlers(https_server);
		await connectDB();

		https_server.listen(port, () => {
			log(
				`🚀 HTTPS Server ready at https://${domain}:${port}${server.graphqlPath}`
			);
		});
	} else {
		const httpServer = http.createServer(app);

		server.installSubscriptionHandlers(httpServer);
		await connectDB();

		httpServer.listen(port, () => {
			log(
				`🚀 HTTP Server ready at http://${domain}:${port}${server.graphqlPath}`
			);
		});
	}
};
startServer();
