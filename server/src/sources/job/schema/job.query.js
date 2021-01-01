const { gql } = require("apollo-server-express");

const jobQuery = gql`
	type Query {
		jobs: [Job]
		getAssignedJobs(user: String): [Job]
		getJob(_id: String): Job
	}
`;

module.exports = { jobQuery };
