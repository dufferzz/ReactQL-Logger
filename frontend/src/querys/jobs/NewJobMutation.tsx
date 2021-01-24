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
		$todo: String!
		$done: String!
		$model: String!
		$make: String!
		$year: String!
		$serial: String!
		$labourHours: String!
		$parts: [PartInput]
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
			success
			error
			data {
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
				make
				model
				year
				serial
				assigned
				labourHours
			}
		}
	}
`;

export default NEWJOB_MUTATION;
