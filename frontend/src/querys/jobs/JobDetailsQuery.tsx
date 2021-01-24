import { gql } from "@apollo/client";
const GET_JOB_QUERY = gql`
	query GetJob($_id: String!) {
		getJob(_id: $_id) {
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
				modified
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

export default GET_JOB_QUERY;
