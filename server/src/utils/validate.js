// src/validate.js

require("dotenv").config();
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

const jwksClient = require("jwks-rsa");

const client = jwksClient({
	jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
});

function getKey(header, callback) {
	const x = expressJwt({
		secret: jwksClient.expressJwtSecret({
			cache: true,
			rateLimit: true,
			jwksRequestsPerMinute: 5,
			jwksUri: "https://dfz.eu.auth0.com/.well-known/jwks.json",
		}),
		audience: "https://dfz.eu.auth0.com/api/v2/",
		issuer: "https://dfz.eu.auth0.com/",
		algorithms: ["RS256"],
	});
	// console.log(x);

	client.getSigningKey(header.kid, function (error, key) {
		const signingKey = key.publicKey || key.rsaPublicKey;
		callback(null, signingKey);
	});
}

async function isTokenValid(token) {
	if (token) {
		const bearerToken = token.split(" ");

		const result = new Promise((resolve, reject) => {
			jwt.verify(
				bearerToken[1],
				getKey,
				{
					audience: process.env.API_IDENTIFIER,
					issuer: `https://${process.env.AUTH0_DOMAIN}/`,
					algorithms: ["RS256"],
				},
				(error, decoded) => {
					if (error) {
						resolve({ error });
					}
					if (decoded) {
						// console.log(decoded);
						resolve({ decoded });
					}
				}
			);
		});

		return result;
	}

	return { error: "No token provided" };
}

module.exports = isTokenValid;
