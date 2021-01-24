import { GraphQLDateTime } from "graphql-iso-date";

import {
	handleNoPermission,
	handleUnauthenticated,
} from "../../utils/authHandlers";
import { checkRoles, checkPermissions } from "../../utils/authChecks";

import pubsub from "../../../pubsub";
import jobController from "./job.controller";

const JOB_ADDED = "JOB_ADDED";
const JOB_UPDATED = "JOB_UPDATED";
const JOB_ID_UPDATED = "JOB_ID_UPDATED";
const JOB_DELETED = "JOB_DELETED";
const JOB_ID_DELETED = "JOB_ID_DELETED";

const jobResolver = {
	DateTime: GraphQLDateTime,

	Subscription: {
		jobAdded: {
			subscribe: (_, __, ctx) => pubsub.asyncIterator([JOB_ADDED]),
		},
		jobUpdated: {
			subscribe: (_, __, ctx) =>
				pubsub.asyncIterator([JOB_ID_UPDATED, JOB_UPDATED]),
		},
		jobIDUpdated: {
			subscribe: (_, __, ctx) => pubsub.asyncIterator([JOB_ID_UPDATED]),
		},
		jobDeleted: {
			subscribe: (_, __, ctx) =>
				pubsub.asyncIterator([JOB_DELETED, JOB_ID_DELETED]),
		},
		jobIDDeleted: {
			subscribe: (_, __, ctx) => pubsub.asyncIterator([JOB_ID_DELETED]),
		},
	},
	Query: {
		jobs(_, args, ctx) {
			if (!ctx.isAuthenticated) return handleUnauthenticated();
			if (checkPermissions(ctx, "readAll:jobs")) {
				return jobController.jobs();
			} else {
				return handleNoPermission();
			}
		},
		getJob(_, args, ctx) {
			if (!ctx.isAuthenticated) return handleUnauthenticated();
			if (checkPermissions(ctx, "readAll:jobs")) {
				return jobController.getJob(args);
			} else {
				return handleNoPermission();
			}
		},
		getAssignedJobs(_, args, ctx) {
			if (!ctx.isAuthenticated) return handleUnauthenticated();
			if (checkPermissions(ctx, "readAssigned: jobs")) {
				return jobController.getAssignedJobs(args);
			} else {
				return handleNoPermission();
			}
		},
	},
	Mutation: {
		addJob(_, args, ctx) {
			if (!ctx.isAuthenticated) return handleUnauthenticated();
			if (checkPermissions(ctx, "create:jobs")) {
				pubsub.publish(JOB_ADDED, { jobAdded: args });
				return jobController.addJob(args);
			} else {
				return handleNoPermission();
			}
		},
		updateJob(_, args, ctx) {
			if (!ctx.isAuthenticated) return handleUnauthenticated();
			if (checkPermissions(ctx, "update:jobs")) {
				pubsub.publish(JOB_ID_UPDATED, { jobIDUpdated: args });
				pubsub.publish(JOB_UPDATED, { jobUpdated: args });
				return jobController.updateJob(args);
			} else {
				return handleNoPermission();
			}
		},
		deleteJob(_, args, ctx) {
			if (!ctx.isAuthenticated) return handleUnauthenticated();
			const { permissions } = ctx.decoded;
			if (permissions.includes("delete:jobs")) {
				pubsub.publish(JOB_DELETED, { jobDeleted: args });
				pubsub.publish(JOB_ID_DELETED, { jobIDDeleted: args });
				return jobController.deleteJob(args);
			} else {
				return handleNoPermission();
			}
		},
	},
};

export default jobResolver;
