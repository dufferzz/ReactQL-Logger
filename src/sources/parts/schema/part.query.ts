import { gql } from "apollo-server-express";

const partQuery = gql`
	type Query {
		parts: [Part!]
		getPart(_id: String!): Part!
	}
`;

export default partQuery;
