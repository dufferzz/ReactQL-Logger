import { gql } from "apollo-server-express";

const partMutation = gql`
	type Mutation {
		addPart(partName: String!, partPrice: String!, partNumber: String!): Part!

		updatePart(
			_id: String!
			partName: String!
			partPrice: String!
			partNumber: String!
		): Part!

		deletePart(_id: String): Part
	}
`;
export default partMutation;
