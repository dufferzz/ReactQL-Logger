import { gql } from "apollo-server-express";

const partType = gql`
	scalar DateTime

	type Part {
		_id: ID!
		partName: String!
		partNumber: String
		price: String!
		thumbnail: String
		stock: String
		location: String
		SKU: String
		Location: String
		supplier: String
	}

	input PartInput {
		partName: String!
		partNumber: String
		price: String!
		thumbnail: String
		stock: String
		location: String
		SKU: String
		Location: String
		supplier: String
	}
`;

export default partType;
