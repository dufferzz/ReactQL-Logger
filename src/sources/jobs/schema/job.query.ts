import { gql } from "apollo-server-express";

const jobQuery = gql`
	type Query {
		jobs(limit: Int, page: Int): JobArrayResponse
		countJobs: JobCountResponse
		countAssignedJobs(user: String!): JobCountResponse
		searchJobs(limit: Int, page: Int, query: String!): JobArrayResponse
		getAssignedJobs(limit: Int, page: Int, user: String!): JobArrayResponse
		getJob(_id: String!): JobResponse
	}
`;

export default jobQuery;
