import { gql } from "@apollo/client";

const GET_ALL_PARTS_QUERY = gql`
	query GetJobs {
		parts {
			_id
			partName
			partNumber
			partPrice
		}
	}
`;
export default GET_ALL_PARTS_QUERY;
