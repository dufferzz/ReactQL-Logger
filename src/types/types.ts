interface AppContext {
	isAuthenticated: boolean;
	decoded: DecodedAuth0;
}

type DecodedAuth0 = {
	iss: string;
	sub: string;
	aud: string[];
	iat: number;
	exp: number;
	azp: string;
	scope: string;
	permissions: string[];
};

type Role = {
	id?: string;
	description?: string;
	name?: string;
};
