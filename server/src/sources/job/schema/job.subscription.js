const { gql } = require("apollo-server-express");

const jobSubscription = gql`
	type Subscription {
		jobAdded: Job
		jobUpdated: Job
		jobDeleted: Job
	}
`;

module.exports = { jobSubscription };
