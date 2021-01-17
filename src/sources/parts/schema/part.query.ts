import { gql } from "apollo-server-express";

const partQuery = gql`
	type Query {
		parts(query: String, limit: Int): [Part]!
		getPart(_id: String!): Part!
	}
`;

export default partQuery;
