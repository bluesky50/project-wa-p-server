import Koa from 'koa';
import cors from '@koa/cors';
import jwt from 'jsonwebtoken';
import koaBody from 'koa-bodyparser';
// import User from '../models/User';
import logger from 'koa-logger';
import helmet from 'koa-helmet';
// import CSRF from 'koa-csrf';

import { isExpired } from '../utils/tokenHelpers';
import { REFRESH_SECRET, AUTH_TOKEN_SECRET } from '../configs/secrets';

const middleware = {
	cors,
	koaBody,
	logger,
	helmet,
	authTokenMiddleware,
	// CSRF,
};

// Middleware function that gets the user from the authToken header.
function authTokenMiddleware() {
	return async function (ctx: Koa.Context, next: () => Promise<any>): Promise<any> {

		const AuthorizationHeader = ctx.request.headers['authorization'];
		let authToken: any = null;

		if (AuthorizationHeader) {
			authToken = AuthorizationHeader.replace('Bearer ', '');
		}

		ctx.state.user = null;
		

		// TODO: 1. Check if auth token is black listed.
		// TOOD: 2. Check if auth token is expired.
		// TODO: 3. Check if auth token is expired.
		// TODO: 4. Check if refresh token is valid - not expired, not blacklisted, and valid for user: if not, use refresh token to create new auth token.
		// TODO: 5. Check if auth token auth token matches a user.

		if (authToken) {
			try {
				const decodedAuthToken: any = jwt.verify(authToken, AUTH_TOKEN_SECRET);
				if (decodedAuthToken.info.userId && !isExpired(decodedAuthToken)) {
					// const usr = await User.findByAuthToken(decodedAuthToken.info.userId, authToken);
					// if (usr) {
					// 	ctx.state.user = usr;
					// }
				}
			} catch (e) {
				console.log(e.message);
			}
		}

		return next();
	}
}

export default middleware;
