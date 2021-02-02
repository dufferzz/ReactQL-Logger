import { gql } from "@apollo/client";

const GET_ASSIGNED_JOBS_QUERY = gql`
	query GetAssignedJobs($user: String!, $limit: Int, $page: Int) {
		getAssignedJobs(user: $user, limit: $limit, page: $page) {
			success
			error
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
		}
	}
`;
export default GET_ASSIGNED_JOBS_QUERY;
