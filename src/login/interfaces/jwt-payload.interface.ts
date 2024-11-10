export interface JwtPayload {
	id: number;
	username: string;
	name?: string;
	email?: string;
	roleId: number;
}
