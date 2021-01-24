import { log, logError } from "./logger";

const checkPermissions = (ctx: any, permission: string | Array<string>) => {
	if (!ctx.isAuthenticated || !ctx.decoded) return false;

	if (ctx.decoded.permissions.includes(permission)) {
		log(`[AUTH] - ${ctx.decoded.sub} Requested ${permission}`);
		return true;
	}
	logError(`[AUTH] - Unauthorized! ${ctx.decoded.sub} Requested ${permission}`);
	return false;
};

const checkRoles = (ctx: any, role: string | Array<string>) => {
	if (!ctx.isAuthenticated || !ctx.decoded) return false;
	if (ctx.decoded["https://dfzservice.no/roles"].includes(role)) return true;
	return false;
};

export { checkRoles, checkPermissions };
