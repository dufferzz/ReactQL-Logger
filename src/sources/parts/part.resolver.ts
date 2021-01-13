import { GraphQLDateTime } from "graphql-iso-date";

import pubsub from "../../../pubsub";
import partController from "./part.controller";

const PART_ADDED = "PART_ADDED";
const PART_UPDATED = "PART_UPDATED";
const PART_DELETED = "PART_DELETED";

const partResolver = {
	DateTime: GraphQLDateTime,

	Subscription: {
		partAdded: {
			subscribe: (_, __, context) => pubsub.asyncIterator([PART_ADDED]),
		},
		partUpdated: {
			subscribe: (_, __, context) => pubsub.asyncIterator([PART_UPDATED]),
		},
		partDeleted: {
			subscribe: (_, __, context) => pubsub.asyncIterator([PART_DELETED]),
		},
	},
	Query: {
		parts(root, args, context) {
			if (!context.isAuthenticated) return [];

			return partController.parts();
		},
		getPart(root, args, context) {
			const { permissions } = context.decoded;
			if (!context.isAuthenticated) return {};
			if (permissions.includes("readAll:parts")) {
				return partController.getPart(args);
			}
		},
	},
	Mutation: {
		addPart(root, args, context) {
			if (!context.isAuthenticated) return "";
			pubsub.publish(PART_ADDED, { partAdded: args });
			return partController.addPart(args);
		},
		updatePart(root, args, context) {
			if (!context.isAuthenticated) return "";
			pubsub.publish(PART_UPDATED, { partUpdated: args });
			return partController.updatePart(args);
		},
		deletePart(root, args, context) {
			if (!context.isAuthenticated) return "";
			pubsub.publish(PART_DELETED, { partDeleted: args });
			return partController.deletePart(args);
		},
	},
};
export default partResolver;
