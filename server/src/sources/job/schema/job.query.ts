import { gql } from "apollo-server-express";

const jobQuery = gql`
	type Query {
		jobs: [Job!]
		getAssignedJobs(user: String!): [Job!]
		getJob(_id: String!): Job!
	}
`;

export default jobQuery;
