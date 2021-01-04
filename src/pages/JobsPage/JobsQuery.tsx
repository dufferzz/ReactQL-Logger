import { gql } from "@apollo/client";

const GET_ALL_JOBS_QUERY = gql`
	query GetJobs {
		jobs {
			_id
			firstname
			lastname
			created
			modified
			status
		}
	}
`;
export default GET_ALL_JOBS_QUERY;
