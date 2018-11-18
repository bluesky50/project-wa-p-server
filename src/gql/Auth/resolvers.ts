import bcrypt from 'bcrypt';
import { LoginError } from '../../lib/errors';
import { isNotAuthenticatedResolver } from '../resolvers';
import IResolverMap from '../../interfaces/gql/IResolverMap';
import IResolverContext from '../../interfaces/gql/IResolverContext';

const loginResolver = isNotAuthenticatedResolver.createResolver(
	async (parent: any, args: { username: string, password: string }, context: IResolverContext) => {
		
		const user = await context.models.User.findByUsername(args.username);

		if (!user) {
			throw new LoginError();
		}

		const valid = await bcrypt.compare(args.password, user.password);

		if (!valid) {
			throw new LoginError();
		}

		const userWithTokens = await user.generateTokens();

		if (userWithTokens) {
			return {
				success: true,
				authToken: userWithTokens.authToken,
				refreshToken: userWithTokens.refreshToken
			}
		} else {
			return {
				success: false,
				authToken: null,
				refreshToken: null
			}
		}
	}
)

const registerResolver = async (parent: any, args: { username: string, email: string, password: string }, context: IResolverContext) => {
	const newUser = await new context.models.User({
		username: args.username,
		email: args.email,
		password: args.password
	}).save();

	if (newUser) {
		return {
			success: true
		}
	} else {
		return {
			success: false
		}
	}
}

const resolvers: IResolverMap = {
	Mutation: {
		login: loginResolver,
		register: registerResolver
	}
}

export default resolvers;