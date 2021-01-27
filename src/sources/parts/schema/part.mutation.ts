import { gql } from "apollo-server-express";

const partMutation = gql`
	type Mutation {
		addPart(
			partName: String!
			partNumber: String!
			price: String!
			Location: String!
			SKU: String!
			supplier: String!
			thumbnail: String!
		): Part!

		updatePart(
			_id: String!
			partName: String!
			partNumber: String!
			price: String!
			Location: String!
			SKU: String!
			supplier: String!
			thumbnail: String!
		): Part!

		deletePart(_id: String!): Part
	}
`;
export default partMutation;
