import { GraphQLDateTime } from "graphql-iso-date";

import pubsub from "../../../pubsub";
import userController from "./user.controller";
import {
	handleNoPermission,
	handleUnauthenticated,
} from "../../utils/authHandlers";
import { checkRoles, checkPermissions } from "../../utils/authChecks";

const USER_ADDED = "USER_ADDED";

const userResolver = {
	DateTime: GraphQLDateTime,

	Subscription: {},
	Query: {
		async getSafeUserList(_: any, args: any, ctx: any) {
			if (!ctx.isAuthenticated) return handleUnauthenticated();
			if (await checkRoles(ctx, "Employee")) {
				return userController.getSafeUserList(args);
			} else {
				return handleNoPermission();
			}
		},
		async users(_: any, args: any, ctx: any) {
			if (!ctx.isAuthenticated) return handleUnauthenticated();
			if (await checkRoles(ctx, "Admin")) {
				return userController.users(args, ctx.decoded);
			} else {
				return handleNoPermission();
			}
		},
		async roles(_: any, args: any, ctx: any) {
			if (!ctx.isAuthenticated) return handleUnauthenticated();
			if (await checkRoles(ctx, "Admin")) {
				return userController.roles(args);
			} else {
				return handleNoPermission();
			}
		},

		async getUser(_: any, args: any, ctx: any) {
			if (!ctx.isAuthenticated) return handleUnauthenticated();

			if (await checkRoles(ctx, "Admin")) {
				return userController.getUser(args);
			} else {
				return handleNoPermission();
			}
		},
	},
	Mutation: {
		async addUser(_: any, args: any, ctx: any) {
			if (!ctx.isAuthenticated) return handleUnauthenticated();
			if (await checkRoles(ctx, "Admin")) {
				pubsub.publish(USER_ADDED, { userAdded: args });
				return userController.addUser(args);
			} else {
				return handleNoPermission();
			}
		},

		async addRoleToUser(_: any, args: any, ctx: any) {
			if (!ctx.isAuthenticated) return handleUnauthenticated();
			if (await checkRoles(ctx, "Admin")) {
				return userController.addRoleToUser(args);
			} else {
				return handleNoPermission();
			}
		},
	},
};
export default userResolver;
