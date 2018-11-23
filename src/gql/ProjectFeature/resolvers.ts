import IProjectFeature from '../../interfaces/models/IProjectFeature';
import { isAuthenticatedResolver } from '../resolvers';
import IResolverMap from '../../interfaces/gql/IResolverMap';
import IResolverContext from '../../interfaces/gql/IResolverContext';

const ProjectFeaturesResolver = async (parent: any, args: {}, context: IResolverContext): Promise<IProjectFeature> => {
	return await context.models.ProjectFeature.find();
};

const ProjectFeatureResolver = async (parent: any, args: { id: string }, context: IResolverContext): Promise<IProjectFeature> => {
	return await context.models.ProjectFeature.findById(args.id);
};

const createProjectFeatureResolver = isAuthenticatedResolver.createResolver(
	async (parent: any, args: IProjectFeature, context: IResolverContext): Promise<IProjectFeature> => {
		const newProjectFeature = await new context.models.ProjectFeature({
			updatedAt: "today",
			projectId: args.projectId,
			creator: context.state.user.id,
			title: args.title,
			description: args.description,
			type: args.type,
			category: args.category,
			tags: args.tags
		}).save();

		if (newProjectFeature) {
			return newProjectFeature;
		} else {
			return await Promise.reject();
		}
	}
)

const resolvers: IResolverMap = {
	Query: {
		projectFeatures: ProjectFeaturesResolver,
		projectFeature: ProjectFeatureResolver
	},
	Mutation: {
		createProjectFeature: createProjectFeatureResolver
	}
}

export default resolvers;

