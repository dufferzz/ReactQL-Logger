import { gql } from "apollo-server-express";

const jobType = gql`
	scalar DateTime

	type Job {
		_id: ID!
		firstname: String!
		lastname: String!
		email: String!
		city: String!
		district: String!
		postcode: String!
		todo: String!
		done: String!
		modified: DateTime!
		created: DateTime!
		status: String!
		model: String!
		make: String!
		year: String!
		serial: String!
		parts: [Part]!
		assigned: String!
		labourHours: String!
	}

	type Part {
		partName: String!
		partNumber: String!
		partQty: String!
		partPrice: String!
	}

	input PartInput {
		partName: String
		partNumber: String
		partQty: String
		partPrice: String
	}
`;

export default jobType;
