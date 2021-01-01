// Need to rebase this to TS

const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");
const dotenv = require("dotenv");
dotenv.config();

const client = jwksClient({
	jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
});

const getKey = (header, callback) => {
	client.getSigningKey(header.kid, function (error, key) {
		const signingKey = key.publicKey || key.rsaPublicKey;
		callback(null, signingKey);
	});
};

const isTokenValid = (token) => {
	if (token) {
		const bearerToken = token.split(" ");
		return new Promise((resolve, reject) => {
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
						resolve({ decoded });
					}
				}
			);
		});
	}

	return { error: "No token provided" };
};

module.exports = isTokenValid;
