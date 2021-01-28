import { gql } from "apollo-server-express";

const jobType = gql`
	scalar DateTime

	type Job {
		_id: ID!
		customername: String!
		email: String!
		address1: String!
		address2: String!
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
		price: String!
	}

	input PartInput {
		partName: String
		partNumber: String
		partQty: String
		partPrice: String
	}

	type JobArrayResponse {
		success: Boolean!
		error: String
		data: [Job]
	}

	type JobResponse {
		success: Boolean!
		error: String
		data: Job
	}
`;

export default jobType;
