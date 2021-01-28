import { log, logError } from "./logger";
import { Management } from "./managementClient";

const checkPermissions = async (ctx: AppContext, reqPermission: string) => {
	if (!ctx.isAuthenticated || !ctx.decoded) return false;

	const userPermissions = await Management.getUserPermissions({
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

const checkRoles = async (ctx: AppContext, reqRole: string) => {
	if (!ctx.isAuthenticated || !ctx.decoded) return false;

	const userRoles = await Management.getUserRoles({ id: ctx.decoded.sub });

	const obj = userRoles.find((role: any) => role.name === reqRole); //TODO

	if (obj && obj.name === reqRole) {
		log(`[AUTH] - ${ctx.decoded.sub} Requested ${reqRole}`);
		return true;
	} else {
		logError(`[AUTH] - Unauthorized! ${ctx.decoded.sub} Requested ${reqRole}`);
		return false;
	}
};

export { checkRoles, checkPermissions };
