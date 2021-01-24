import { gql } from "@apollo/client";

const ANY_JOB_DELETED_SUBSCRIPTION = gql`
	subscription jobDeleted {
		jobDeleted {
			data {
				_id
				firstname
				lastname
				status
				created
				modified
				assigned
			}
		}
	}
`;
export default ANY_JOB_DELETED_SUBSCRIPTION;
