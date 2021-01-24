import { gql } from "@apollo/client";

const GET_ASSIGNED_JOBS_QUERY = gql`
	query GetAssignedJobs($user: String!) {
		getAssignedJobs(user: $user) {
			success
			error
			data {
				_id
				firstname
				lastname
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
