import { gql } from "@apollo/client";

const JOB_ID_DELETED_SUBSCRIPTION = gql`
	subscription jobDeleted($_id: String!) {
		jobDeleted(_id: $_id) {
			_id
		}
	}
`;
export default JOB_ID_DELETED_SUBSCRIPTION;
