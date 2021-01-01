const {
	addMockFunctionsToSchema,
	makeExecutableSchema,
} = require("apollo-server-express");
const { jobType, jobQuery, jobMutation, jobSubscription } = require("./schema");

const jobSchema = makeExecutableSchema({
	typeDefs: [jobType, jobQuery, jobMutation, jobSubscription],
});
addMockFunctionsToSchema({ schema: jobSchema });

module.exports = { jobSchema };
