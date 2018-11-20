import IFeatureEvent from '../../interfaces/models/IFeatureEvent';
import { isAuthenticatedResolver } from '../resolvers';
import IResolverMap from '../../interfaces/gql/IResolverMap';
import IResolverContext from '../../interfaces/gql/IResolverContext';

const FeatureEventsResolver = async (parent: any, args: {}, context: IResolverContext): Promise<IFeatureEvent> => {
	return await context.models.FeatureEvent.find();
};

const FeatureEventResolver = async (parent: any, args: { id: string }, context: IResolverContext): Promise<IFeatureEvent> => {
	return await context.models.FeatureEvent.findById(args.id);
};

const createFeatureEventResolver = isAuthenticatedResolver.createResolver(
	async (parent: any, args: IFeatureEvent, context: IResolverContext): Promise<IFeatureEvent> => {
		const newFeatureEvent = await new context.models.FeatureEvent({
			updatedAt: "11/18/2018",
			feature: args.feature,
			session: args.session,
			title: args.title,
			description: args.description,
			type: args.type,
			category: args.category,
			tags: args.tags
		}).save();

		if (newFeatureEvent) {
			return newFeatureEvent;
		} else {
			return await Promise.reject();
		}
	}
)

const resolvers: IResolverMap = {
	Query: {
		featureEvents: FeatureEventsResolver,
		featureEvent: FeatureEventResolver
	},
	Mutation: {
		createFeatureEvent: createFeatureEventResolver
	}
}

export default resolvers;

