import { ManagementClient } from "auth0";

// import User from "./user.model";
import { sendError, sendResponse } from "../../utils/responseHandlers";

const management = new ManagementClient({
	token: process.env.AUTH0_MANAGEMENT_TOKEN_TMP,
	domain: process.env.AUTH0_DOMAIN,
});

const userController = {
	users: async (args, decoded) =>
		await management
			.getUsers()
			.then((users) => {
				return users.filter((user) => {
					return {
						userid: user.user_id,
						email: user.email,
						nickname: user.nickname,
						picture: user.picture,
					};
				});
			})
			.then((data) => sendResponse(data))
			.catch((err) => sendError(err)),
	getSafeUserList: async (args) =>
		await management
			.getUsers()
			.then((users) => {
				return users.filter((user) => {
					return {
						nickname: user.nickname,
						picture: user.picture,
					};
				});
			})
			.then((data) => sendResponse(data))
			.catch((err) => sendError(err)),

	roles: async (args) =>
		await management.roles
			.getAll()
			.then((data) => sendResponse(data))
			.catch((err) => sendError(err)),

	addRoleToUser: async (args) => {
		console.log(args);
		return await management.users
			.assignRoles({ id: args.userid }, { users: [args.roleid] }) //TODO: Change frontend to do user array
			.then((data) => {
				console.log(data);
				return sendResponse(data);
			})
			.catch((err) => {
				console.log(err);
				return sendError(err);
			});
	},
	removeRolesFromUser: async (args) => {
		console.log(args);
		return await management.users
			.removeRoles({ id: args.userid }, { roles: [args.roles] }) //TODO: Change frontend to do user array
			.then((data) => {
				console.log(data);
				return sendResponse(data);
			})
			.catch((err) => {
				console.log(err);
				return sendError(err);
			});
	},

	getUser: async (args) =>
		await management.users
			.get({ id: args.userid })
			.then((data) => sendResponse(data))
			.catch((err) => sendError(err)),

	addUser: async (args) => {
		console.log(args);
		const newuser = {};
		return await management.users
			.create(newuser)
			.then((data) => sendResponse(data))
			.catch((err) => sendError(err));
	},

	updateUser: async (args) => {
		console.log(args);
		const userDetails = {
			email: args.email,
			//.......
		};
		return await management.users
			.update({ id: args.userid }, userDetails)
			.then((data) => sendResponse(data))
			.catch((err) => sendError(err));
	},

	deleteUser: async (args) => {
		console.log(args);

		return await management.users
			.delete({ id: args.userid })
			.then((data) => sendResponse(data))
			.catch((err) => sendError(err));
	},

	getUserPermissions: async (args) => {
		console.log(args);

		return await management.users
			.getPermisions({ id: args.userid })
			.then((data) => sendResponse(data))
			.catch((err) => sendError(err));
	},
};

export default userController;
