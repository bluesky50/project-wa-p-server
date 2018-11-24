import IProject from '../../interfaces/models/IProject';
import { isAuthenticatedResolver } from '../resolvers';
import IResolverMap from '../../interfaces/gql/IResolverMap';
import IResolverContext from '../../interfaces/gql/IResolverContext';

const ProjectsResolver = async (parent: any, args: {}, context: IResolverContext): Promise<IProject> => {
	return await context.models.Project.find();
};

const ProjectResolver = async (parent: any, args: { id: string }, context: IResolverContext): Promise<IProject> => {
	return await context.models.Project.findById(args.id);
};

const createProjectResolver = isAuthenticatedResolver.createResolver(
	async (parent: any, args: IProject, context: IResolverContext): Promise<IProject> => {
		const newProject = await new context.models.Project({
			updatedAt: "today",
			creator: context.state.user.id,
			repoUrl: args.repoUrl,
			title: args.title,
			description: args.description,
			type: args.type,
			category: args.category,
			tags: args.tags
		}).save();

		if (newProject) {
			return newProject;
		} else {
			return await Promise.reject();
		}
	}
)

const resolvers: IResolverMap = {
	Query: {
		projects: ProjectsResolver,
		project: ProjectResolver
	},
	Mutation: {
		createProject: createProjectResolver
	}
}

export default resolvers;

