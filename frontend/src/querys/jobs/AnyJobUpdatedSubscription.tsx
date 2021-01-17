import { gql } from "@apollo/client";

const ANY_JOB_UPDATED_SUBSCRIPTION = gql`
	subscription jobUpdated {
		jobUpdated {
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
export default ANY_JOB_UPDATED_SUBSCRIPTION;
