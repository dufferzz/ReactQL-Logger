import { gql } from "@apollo/client";

const GET_ALL_PARTS_QUERY = gql`
	query GetParts {
		parts {
			_id
			partName
			price
			partNumber
			supplier
			Location
			thumbnail
		}
	}
`;
export default GET_ALL_PARTS_QUERY;
