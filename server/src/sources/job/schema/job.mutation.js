const { gql } = require("apollo-server-express");

const jobMutation = gql`
	type Mutation {
		addJob(
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
			assigned: String
		): Job

		updateJob(
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
			assigned: String
		): Job

		deleteJob(_id: String): Job
	}
`;
module.exports = { jobMutation };
