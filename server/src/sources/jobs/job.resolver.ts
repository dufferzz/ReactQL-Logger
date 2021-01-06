import { GraphQLDateTime } from "graphql-iso-date";

import pubsub from "../../../pubsub";
import jobController from "./job.controller";

const JOB_ADDED = "JOB_ADDED";
const JOB_UPDATED = "JOB_UPDATED";
const JOB_DELETED = "JOB_DELETED";

const jobResolver = {
	DateTime: GraphQLDateTime,

	Subscription: {
		jobAdded: {
			subscribe: (_, __, context) => pubsub.asyncIterator([JOB_ADDED]),
		},
		jobUpdated: {
			subscribe: (_, __, context) => pubsub.asyncIterator([JOB_UPDATED]),
		},
		jobDeleted: {
			subscribe: (_, __, context) => pubsub.asyncIterator([JOB_DELETED]),
		},
	},
	Query: {
		jobs(root, args, context) {
			if (!context.isAuthenticated) return [];

			return jobController.jobs();
		},
		getJob(root, args, context) {
			const { permissions } = context.decoded;
			if (!context.isAuthenticated) return {};
			if (
				permissions.includes("readAssigned: jobs") ||
				permissions.includes("readAll:jobs")
			) {
				return jobController.getJob(args);
			}
		},
		getAssignedJobs(root, args, context) {
			return jobController.getAssignedJobs(args);
		},
	},
	Mutation: {
		addJob(root, args, context) {
			if (!context.isAuthenticated) return "";
			pubsub.publish(JOB_ADDED, { jobAdded: args });
			return jobController.addJob(args);
		},
		updateJob(root, args, context) {
			if (!context.isAuthenticated) return "";
			pubsub.publish(JOB_UPDATED, { jobUpdated: args });
			return jobController.updateJob(args);
		},
		deleteJob(root, args, context) {
			if (!context.isAuthenticated) return "";
			pubsub.publish(JOB_DELETED, { jobDeleted: args });
			return jobController.deleteJob(args);
		},
	},
};
export default jobResolver;