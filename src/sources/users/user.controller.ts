import { ManagementClient } from "auth0";

// import User from "./user.model";
import { sendError, sendResponse } from "../../utils/responseHandlers";

let management: ManagementClient;

if (process.env.AUTH0_MANAGEMENT_TOKEN_TMP && process.env.AUTH0_DOMAIN) {
	management = new ManagementClient({
		token: process.env.AUTH0_MANAGEMENT_TOKEN_TMP,
		domain: process.env.AUTH0_DOMAIN,
	});
} else {
	throw new Error(
		"Missing ENV Variables, Check AUTH0_MANAGEMENT_TOKEN_TMP and AUTH0_DOMAIN"
	);
}

const userController = {
	users: async (args: any, decoded: any) =>
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
	getSafeUserList: async (args: any) =>
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

	roles: async (args: any) =>
		await management
			.getRoles()
			.then((data) => sendResponse(data))
			.catch((err) => sendError(err)),

	addRoleToUser: async (args: any) => {
		console.log(args);
		return await management
			.assignRolestoUser({ id: args.userid }, { roles: [args.roleid] }) //TODO: Change frontend to do user array
			.then((data) => {
				console.log(data);
				return sendResponse(data);
			})
			.catch((err) => {
				console.log(err);
				return sendError(err);
			});
	},
	removeRolesFromUser: async (args: any) => {
		console.log(args);
		return await management
			.removeRolesFromUser({ id: args.userid }, { roles: [args.roles] }) //TODO: Change frontend to do user array
			.then((data) => {
				console.log(data);
				return sendResponse(data);
			})
			.catch((err) => {
				console.log(err);
				return sendError(err);
			});
	},

	getUser: async (args: any) =>
		await management
			.getUser({ id: args.userid })
			.then((data) => sendResponse(data))
			.catch((err) => sendError(err)),

	addUser: async (args: any) => {
		console.log(args);
		const newuser = {
			connection: "",
		};
		return await management
			.createUser(newuser)
			.then((data) => sendResponse(data))
			.catch((err) => sendError(err));
	},

	updateUser: async (args: any) => {
		console.log(args);
		const userDetails = {
			email: args.email,
			//.......
		};
		return await management
			.updateUser({ id: args.userid }, userDetails)
			.then((data) => sendResponse(data))
			.catch((err) => sendError(err));
	},

	deleteUser: async (args: any) => {
		console.log(args);

		return await management
			.deleteUser({ id: args.userid })
			.then((data) => sendResponse(data))
			.catch((err) => sendError(err));
	},

	getUserPermissions: async (args: any) => {
		console.log(args);

		return await management
			.getUserPermissions({ id: args.userid })
			.then((data) => sendResponse(data))
			.catch((err) => sendError(err));
	},
};

export default userController;
