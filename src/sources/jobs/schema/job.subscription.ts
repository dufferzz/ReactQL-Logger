import { gql } from "apollo-server-express";

const jobSubscription = gql`
	type Subscription {
		jobAdded: Job
		jobUpdated: Job
		jobIDUpdated(_id: String!): Job
		jobDeleted: Job
		jobIDDeleted(_id: String!): Job
	}
`;

export default jobSubscription;
