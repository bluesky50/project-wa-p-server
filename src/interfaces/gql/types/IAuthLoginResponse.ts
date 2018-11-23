export type IAuthLoginResponse = {
	success: boolean;
	authToken?: string | null;
	refreshToken?: string | null;
}