import { gql } from "@apollo/client";

const GET_ALL_JOBS_QUERY = gql`
	query GetJobs($limit: Int, $page: Int) {
		jobs(limit: $limit, page: $page) {
			success
			data {
				_id
				customername
				todo
				make
				model
				created
				modified
				status
			}
			error
		}
	}
`;
export default GET_ALL_JOBS_QUERY;
