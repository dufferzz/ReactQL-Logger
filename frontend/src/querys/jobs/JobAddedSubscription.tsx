import { gql } from "@apollo/client";

const JOB_ADDED_SUBSCRIPTION = gql`
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
export default JOB_ADDED_SUBSCRIPTION;