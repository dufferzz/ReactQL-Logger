import { gql } from "@apollo/client";

const ASSIGNED_COUNT_JOBS_QUERY = gql`
	query GetAssignedJobCount($user: String!) {
		countAssignedJobs(user: $user) {
			data
			success
			error
		}
	}
`;
export default ASSIGNED_COUNT_JOBS_QUERY;
