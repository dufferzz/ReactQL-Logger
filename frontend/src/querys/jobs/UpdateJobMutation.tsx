import { gql } from "@apollo/client";

const UPDATE_JOB_MUTATION = gql`
	mutation UpdateJob(
		$_id: String!
		$firstname: String!
		$lastname: String!
		$email: String!
		$city: String!
		$district: String!
		$postcode: String!
		$assigned: String!
		$status: String!
		$todo: String!
		$done: String!
		$model: String!
		$make: String!
		$year: String!
		$serial: String!
		$parts: [PartInput]
		$labourHours: String!
	) {
		updateJob(
			_id: $_id
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
			firstname
			lastname
			email
			city
			district
			postcode
			todo
			done
			parts {
				partName
				partNumber
				partQty
				partPrice
			}
			status
			created
			modified
			make
			model
			year
			serial
			assigned
			labourHours
		}
	}
`;

export default UPDATE_JOB_MUTATION;
