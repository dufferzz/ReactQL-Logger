import { gql } from "apollo-server-express";

const jobQuery = gql`
	type Query {
		jobs: JobArrayResponse
		getAssignedJobs(user: String!): JobArrayResponse
		getJob(_id: String!): JobResponse
	}
`;

export default jobQuery;
