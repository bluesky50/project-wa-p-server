import Koa from 'koa';
import Router from 'koa-router';
import { ApolloServer } from 'apollo-server-koa';
import { nonExecutableGqlSchema } from '../gql/schema';
import middleware from '../lib/middleware';

export function applyMiddleware(app: Koa): void {
	app.use(middleware.cors());
	app.use(middleware.logger());
	app.use(middleware.helmet());
	app.use(middleware.koaBody());
	// app.use(middleware.authTokenMiddleware());
}

export function addGraphQLRoute(app: Koa, gqlEndpoint: string, models: { [key: string]: any }): void {
	const gqlRouter = new Router();

	gqlRouter
		.post(gqlEndpoint, middleware.authTokenMiddleware())
		.get(gqlEndpoint, async (ctx: Koa.Context, next: () => Promise<any>): Promise<any> => {
			return await next();
		})
	app.use(gqlRouter.routes());

	const context = (contextObject: any) => { 
		return {
			state: contextObject.ctx.state, 
			models 
		}
	};
	const server = new ApolloServer({ 
		typeDefs: nonExecutableGqlSchema.typeDefs, 
		resolvers: nonExecutableGqlSchema.resolvers, 
		mocks: true,
		context
	});
	server.applyMiddleware({ app, path: gqlEndpoint });
}
