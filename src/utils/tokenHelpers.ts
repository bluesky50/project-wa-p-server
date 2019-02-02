import _ from 'lodash';
import jwt from 'jsonwebtoken';
import IUser from '../interfaces/models/IUser';
// import bcrypt from 'bcrypt';
import { AUTH_TOKEN_SECRET, REFRESH_SECRET } from '../configs/secrets';

export async function createAuthToken(user: any): Promise<string> {
	const secret = AUTH_TOKEN_SECRET; // TODO: Change this later;
	const authToken = await jwt.sign(
		{ info: { userId: user._id.toHexString(), username: user.username } },
		secret,
		{ expiresIn: '1d' }
	);
	return authToken;
}

export async function createRefreshToken(user: IUser) {
	const secret = REFRESH_SECRET; // TODO: Change this later.
	const refreshToken = await jwt.sign(
		{ user: _.pick(user, ['id', 'username']) },
		secret,
		{ expiresIn: '7d' }
	);
	return refreshToken;
}

export const createTokens = async (user: string, tokenSecret: string, refreshSecret: string) => {
	
}

export const refreshToken = (refreshToken: string, refreshSecret: string) => {
	
}

export function isExpired(decodedToken: any): boolean {
	const currentTime = Date.now() / 1000;
	if (decodedToken.exp && decodedToken.exp < currentTime) {
		return true
	}
	return false;
}

export function generateSecret() {

}
