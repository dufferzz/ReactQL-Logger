import { gql } from "apollo-server-express";

const jobMutation = gql`
	type Mutation {
		addJob(
			firstname: String!
			lastname: String!
			email: String!
			city: String!
			district: String!
			postcode: String!
			todo: String!
			done: String!
			status: String!
			model: String!
			make: String!
			year: String!
			serial: String
			assigned: String!
			parts: [PartInput]
			labourHours: String!
		): JobResponse!

		updateJob(
			_id: String!
			firstname: String!
			lastname: String!
			email: String!
			city: String!
			district: String!
			postcode: String!
			todo: String!
			done: String!
			status: String!
			model: String!
			make: String!
			year: String!
			serial: String
			assigned: String!
			parts: [PartInput]
			labourHours: String!
		): JobResponse!

		deleteJob(_id: String): JobResponse!
	}
`;
export default jobMutation;
