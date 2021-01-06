import { gql } from "apollo-server-express";

const partType = gql`
	scalar DateTime

	type Part {
		_id: ID!
		partName: String!
		partNumber: String
		partQty: String
		price: String!
		dateAdded: String
		modified: DateTime
		stockCount: String
		thumbnail: String
		stock: String
		location: String
		SKU: String
		Location: String
		addedBy: String
		manufaturer: String
		supplier: String
	}

	input PartInput {
		partName: String
		partNumber: String
		partQty: String
		price: String
		dateAdded: String
		modified: DateTime
		stockCount: String
		thumbnail: String
		stock: String
		location: String
		SKU: String
		Location: String
		addedBy: String
		manufaturer: String
		suppler: String
	}
`;

export default partType;
