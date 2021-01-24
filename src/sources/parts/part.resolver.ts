import { GraphQLDateTime } from "graphql-iso-date";

import pubsub from "../../../pubsub";
import partController from "./part.controller";

import {
	handleNoPermission,
	handleUnauthenticated,
} from "../../utils/authHandlers";
import { checkRoles, checkPermissions } from "../../utils/authChecks";

const PART_ADDED = "PART_ADDED";
const PART_UPDATED = "PART_UPDATED";
const PART_DELETED = "PART_DELETED";

const partResolver = {
	DateTime: GraphQLDateTime,

	Subscription: {
		partAdded: {
			subscribe: (_, __, ctx) => pubsub.asyncIterator([PART_ADDED]),
		},
		partUpdated: {
			subscribe: (_, __, ctx) => pubsub.asyncIterator([PART_UPDATED]),
		},
		partDeleted: {
			subscribe: (_, __, ctx) => pubsub.asyncIterator([PART_DELETED]),
		},
	},
	Query: {
		parts(_, args, ctx) {
			if (!ctx.isAuthenticated) return handleUnauthenticated();
			if (checkPermissions(ctx, "readAll:parts")) {
				return partController.parts(args);
			} else {
				return handleNoPermission();
			}
		},
		getPart(_, args, ctx) {
			if (!ctx.isAuthenticated) return handleUnauthenticated();
			if (checkPermissions(ctx, "readAll:parts")) {
				return partController.getPart(args);
			} else {
				return handleNoPermission();
			}
		},
	},
	Mutation: {
		addPart(_, args, ctx) {
			if (!ctx.isAuthenticated) return handleUnauthenticated();
			if (checkPermissions(ctx, "create:parts")) {
				pubsub.publish(PART_ADDED, { partAdded: args });
				return partController.addPart(args);
			} else {
				return handleNoPermission();
			}
		},
		updatePart(_, args, ctx) {
			if (!ctx.isAuthenticated) return handleUnauthenticated();
			if (checkPermissions(ctx, "update:parts")) {
				pubsub.publish(PART_UPDATED, { partUpdated: args });
				return partController.updatePart(args);
			} else {
				return handleNoPermission();
			}
		},
		deletePart(_, args, ctx) {
			if (!ctx.isAuthenticated) return handleUnauthenticated();
			if (checkPermissions(ctx, "delete:parts")) {
				pubsub.publish(PART_DELETED, { partDeleted: args });
				return partController.deletePart(args);
			} else {
				return handleNoPermission();
			}
		},
	},
};
export default partResolver;
