import { gql } from "@apollo/client";

const DELETE_JOB_MUTATION = gql`
	mutation DeleteJob($_id: String!) {
		deleteJob(_id: $_id) {
			_id
		}
	}
`;

export default DELETE_JOB_MUTATION;
