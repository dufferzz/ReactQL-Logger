import { gql } from "@apollo/client";

const JOBS_SUBSCRIPTION = gql`
	subscription jobAdded {
		jobAdded {
			_id
			firstname
			lastname
			status
			created
			modified
			assigned
		}
	}
`;
export default JOBS_SUBSCRIPTION;
