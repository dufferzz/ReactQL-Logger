import { gql } from "@apollo/client";

const NEWJOB_MUTATION = gql`
	mutation AddJob(
		$firstname: String!
		$lastname: String!
		$email: String!
		$city: String!
		$district: String!
		$postcode: String!
		$assigned: String!
		$status: String!
		$todo: String
		$done: String
		$model: String
		$make: String
		$year: String
		$serial: String
		$parts: String
		$labourHours: String
	) {
		addJob(
			firstname: $firstname
			lastname: $lastname
			email: $email
			city: $city
			district: $district
			postcode: $postcode
			assigned: $assigned
			status: $status
			todo: $todo
			done: $done
			model: $model
			make: $make
			year: $year
			serial: $serial
			parts: $parts
			labourHours: $labourHours
		) {
			_id
		}
	}
`;

export default NEWJOB_MUTATION;
