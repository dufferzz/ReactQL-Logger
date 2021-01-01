const { gql } = require("apollo-server-express");

const jobQuery = gql`
	type Query {
		jobs: [Job]
		getAssignedJobs: [Job]
		getJob(_id: String): Job
	}
`;

module.exports = { jobQuery };
