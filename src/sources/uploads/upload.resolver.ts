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
			subscribe: (_: any, __: any, ctx: any) =>
				pubsub.asyncIterator([UPLOAD_ADDED]),
		},
		partUpdated: {
			subscribe: (_: any, __: any, ctx: any) =>
				pubsub.asyncIterator([UPLOAD_UPDATED]),
		},
		partDeleted: {
			subscribe: (_: any, __: any, ctx: any) =>
				pubsub.asyncIterator([UPLOAD_DELETED]),
		},
	},
	Query: {
		uploads(_: any, args: any, ctx: any) {
			if (!ctx.isAuthenticated) return { succss: false };

			return uploadController.uploads(args);
		},
		getUpload(_: any, args: any, ctx: any) {
			const { permissions } = ctx.decoded;
			if (!ctx.isAuthenticated) return {};
			if (permissions.includes("readAll:parts")) {
				return uploadController.getUpload(args);
			}
		},
	},
	Mutation: {
		async addUpload(_: any, args: any, ctx: any) {
			console.log(_, args, ctx);
			if (!ctx.isAuthenticated) return { success: false };
			pubsub.publish(UPLOAD_ADDED, { uploadAdded: args });
			return await uploadController.addUpload(args);
		},
		updateUpload(_: any, args: any, ctx: any) {
			if (!ctx.isAuthenticated) return "";
			pubsub.publish(UPLOAD_UPDATED, { uploadUpdated: args });
			return uploadController.updateUpload(args);
		},
		deleteUpload(_: any, args: any, ctx: any) {
			if (!ctx.isAuthenticated) return "";
			pubsub.publish(UPLOAD_DELETED, { uploadDeleted: args });
			return uploadController.deleteUpload(args);
		},
	},
};
export default uploadResolver;
