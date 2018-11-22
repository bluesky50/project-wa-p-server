import Koa from 'koa';
import cors from '@koa/cors';
import jwt from 'jsonwebtoken';
import koaBody from 'koa-bodyparser';
import User from '../models/User';
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
		// console.log('authTokenMiddleware');
		const AuthorizationHeader = ctx.request.headers['authorization'];
		// console.log(AuthorizationHeader);
		let authToken: any = null;
		if (AuthorizationHeader) {
			authToken = AuthorizationHeader.replace('Bearer ', '');
		}

		// console.log("authToken", authToken);
		ctx.state.user = null;
		// console.log('setting ctx.state.user = null', ctx);

		// Check if auth token is black listed.
		
		// Check if auth token is expired.
		// If auth token is expired.
		// (Check if refresh token is valid - not expired, not blacklisted, and valid for user: if not, use refresh token to create new auth token).

		// Check if auth token auth token matches a user.

		if (authToken) {
			try {
				const decodedAuthToken: any = jwt.verify(authToken, AUTH_TOKEN_SECRET);
				// console.log("decodedAuthToken", decodedAuthToken);
				if (isExpired(decodedAuthToken)) {

					const refreshToken = ctx.request.headers['x-refresh-token'];
					if (refreshToken) {
						try {
							const decodedRefreshToken: any = jwt.verify(refreshToken, REFRESH_SECRET);
							if (decodedRefreshToken.user.id && !isExpired(decodedRefreshToken)) {
								const usr = await User.findByRefreshToken(decodedRefreshToken.user.id, refreshToken);
								if (usr) {
									// Not sure exactly how to implement refresh tokens.

									// Create new auth token, save to user in data base.
									// Should I generate new refresh token as well. 
									const usrWithNewTokens = await usr.generateAuthToken().populate('roles', 'title');
									// But how to send that back with the request so the client now has the updated auth token.
									ctx.state.user = usrWithNewTokens;
								}
							}

						} catch (e) {
							console.log(e.message);
						}
					}

				} else if (decodedAuthToken.info.userId && !isExpired(decodedAuthToken)) {
					const usr = await User.findByAuthToken(decodedAuthToken.info.userId, authToken);
					if (usr) {
						ctx.state.user = usr;
					}
				} else {

				}

			} catch (e) {
				console.log(e.message);
			}
		}

		return next();
	}
}

export default middleware;
