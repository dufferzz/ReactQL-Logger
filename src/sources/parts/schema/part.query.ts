import { gql } from "apollo-server-express";

const partQuery = gql`
	type Query {
		parts(query: String, limit: Int): PartArrayResponse!
		getPart(_id: String!): PartResponse!
	}
`;

export default partQuery;
