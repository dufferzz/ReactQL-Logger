import { log, logError } from "./logger";
import { ManagementClient } from "auth0";

const management = new ManagementClient({
	token: process.env.AUTH0_MANAGEMENT_TOKEN_TMP,
	domain: process.env.AUTH0_DOMAIN,
});

const checkPermissions = async (
	ctx: any,
	reqPermission: string | Array<string>
) => {
	if (!ctx.isAuthenticated || !ctx.decoded) return false;

	const userPermissions = await management.getUserPermissions({
		id: ctx.decoded.sub,
	});

	const obj = userPermissions.find(
		(role) => role.permission_name === reqPermission
	);
	if (obj && obj.permission_name === reqPermission) {
		log(`[AUTH] - ${ctx.decoded.sub} Requested ${reqPermission}`);
		return true;
	} else {
		logError(
			`[AUTH] - Unauthorized! ${ctx.decoded.sub} Requested ${reqPermission}`
		);
		return false;
	}
};

const checkRoles = async (ctx: any, reqRole: string | Array<string>) => {
	if (!ctx.isAuthenticated || !ctx.decoded) return false;

	const userRoles = await management.users.getRoles({ id: ctx.decoded.sub });

	const obj = userRoles.find((role) => role.name === reqRole);

	if (obj.name === reqRole) {
		log(`[AUTH] - ${ctx.decoded.sub} Requested ${reqRole}`);
		return true;
	} else {
		logError(`[AUTH] - Unauthorized! ${ctx.decoded.sub} Requested ${reqRole}`);
		return false;
	}
};

export { checkRoles, checkPermissions };
