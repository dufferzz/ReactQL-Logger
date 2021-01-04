import { gql } from "@apollo/client";

const JOBS_SUBSCRIPTION = gql`
	subscription jobAdded {
		jobAdded {
			_id
			firstname
			lastname
		}
	}
`;
export default JOBS_SUBSCRIPTION;
