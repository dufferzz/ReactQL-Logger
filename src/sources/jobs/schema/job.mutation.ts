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
		): Job!

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
		): Job!

		deleteJob(_id: String): Job
	}
`;
export default jobMutation;
