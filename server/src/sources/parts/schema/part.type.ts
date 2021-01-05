import { gql } from "apollo-server-express";

const jobType = gql`
	scalar DateTime

	type Part {
		partName: String
		partNumber: String
		partQty: String
		partPrice: String
	}

	input PartInput {
		partName: String
		partNumber: String
		partQty: String
		partPrice: String
	}
`;

export default jobType;
