import { gql } from "apollo-server-express";

const jobSubscription = gql`
	type Subscription {
		jobAdded: Job
		jobUpdated: Job
		jobDeleted: Job
	}
`;

export default jobSubscription;
