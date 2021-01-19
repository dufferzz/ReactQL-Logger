import { GraphQLDateTime } from "graphql-iso-date";

import pubsub from "../../../pubsub";
import uploadController from "./upload.controller";

const UPLOAD_ADDED = "UPLOAD_ADDED";
const UPLOAD_UPDATED = "UPLOAD_UPDATED";
const UPLOAD_DELETED = "UPLOAD_DELETED";

const uploadResolver = {
	DateTime: GraphQLDateTime,

	Subscription: {
		uploadAdded: {
			subscribe: (_, __, context) => pubsub.asyncIterator([UPLOAD_ADDED]),
		},
		partUpdated: {
			subscribe: (_, __, context) => pubsub.asyncIterator([UPLOAD_UPDATED]),
		},
		partDeleted: {
			subscribe: (_, __, context) => pubsub.asyncIterator([UPLOAD_DELETED]),
		},
	},
	Query: {
		uploads(root, args, context) {
			if (!context.isAuthenticated) return [];

			return uploadController.uploads(args);
		},
		getUpload(root, args, context) {
			const { permissions } = context.decoded;
			if (!context.isAuthenticated) return {};
			if (permissions.includes("readAll:parts")) {
				return uploadController.getUpload(args);
			}
		},
	},
	Mutation: {
		async addUpload(root, args, context) {
			console.log(root, args, context);
			if (!context.isAuthenticated) return { success: false };
			pubsub.publish(UPLOAD_ADDED, { uploadAdded: args });
			return await uploadController.addUpload(args);
		},
		updateUpload(root, args, context) {
			if (!context.isAuthenticated) return "";
			pubsub.publish(UPLOAD_UPDATED, { uploadUpdated: args });
			return uploadController.updateUpload(args);
		},
		deleteUpload(root, args, context) {
			if (!context.isAuthenticated) return "";
			pubsub.publish(UPLOAD_DELETED, { uploadDeleted: args });
			return uploadController.deleteUpload(args);
		},
	},
};
export default uploadResolver;
