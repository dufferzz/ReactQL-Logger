import { gql } from "@apollo/client";

const JOBS_SUBSCRIPTION = gql`
	subscription jobs {
		jobs {
			_id
			firstname
			lastname
			status
			created
			modified
		}
	}
`;
export default JOBS_SUBSCRIPTION;
