import { gql } from "apollo-server-express";

const jobType = gql`
	type Job {
		_id: String
		firstname: String
		lastname: String
		email: String
		city: String
		district: String
		postcode: String
		date: String
		todo: String
		done: String
		modified: String
		created: String
		status: String
		model: String
		make: String
		year: String
		serial: String
		parts: String
		assigned: String
		labourHours: Int
	}
`;

export default jobType;
