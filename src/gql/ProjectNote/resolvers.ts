import IProjectNote from '../../interfaces/models/IProjectNote';
import { isAuthenticatedResolver } from '../resolvers';
import IResolverMap from '../../interfaces/gql/IResolverMap';
import IResolverContext from '../../interfaces/gql/IResolverContext';

const ProjectNotesResolver = async (parent: any, args: {}, context: IResolverContext): Promise<IProjectNote> => {
	return await context.models.ProjectNote.find();
};

const ProjectNoteResolver = async (parent: any, args: { id: string }, context: IResolverContext): Promise<IProjectNote> => {
	return await context.models.ProjectNote.findById(args.id);
};

const createProjectNoteResolver = isAuthenticatedResolver.createResolver(
	async (parent: any, args: IProjectNote, context: IResolverContext): Promise<IProjectNote> => {
		const newProjectNote = await new context.models.ProjectNote({
			updatedAt: "11/18/2018",
			creator: context.state.user.id,
			projectId: args.projectId,
			title: args.title,
			description: args.description,
			type: args.type,
			category: args.category,
			tags: args.tags
		}).save();

		if (newProjectNote) {
			return newProjectNote;
		} else {
			return await Promise.reject();
		}
	}
)

const resolvers: IResolverMap = {
	Query: {
		projectNotes: ProjectNotesResolver,
		projectNote: ProjectNoteResolver
	},
	Mutation: {
		createProjectNote: createProjectNoteResolver
	}
}

export default resolvers;

