import IExercise from '../../interfaces/models/IExercise';
import { isAuthenticatedResolver } from '../resolvers';
import IResolverMap from '../../interfaces/gql/IResolverMap';
import IResolverContext from '../../interfaces/gql/IResolverContext';

const ExercisesResolver = async (parent: any, args: {}, context: IResolverContext): Promise<IExercise> => {
	return await context.models.Exercise.find();
};

const ExerciseResolver = async (parent: any, args: { id: string }, context: IResolverContext): Promise<IExercise> => {
	return await context.models.Exercise.findById(args.id);
};

const createExerciseResolver = isAuthenticatedResolver.createResolver(
	async (parent: any, args: IExercise, context: IResolverContext): Promise<IExercise> => {
		const newExercise = await new context.models.Exercise({
			updatedAt: '11/18/2018',
			creator: context.state.user._id,
			title: args.title,
			description: args.description,
			type: args.type,
			category: args.category,
			tags: args.tags,
		}).save();

		if (newExercise) {
			return newExercise;
		} else {
			return await Promise.reject();
		}
	}
)

const resolvers: IResolverMap = {
	Query: {
		exercises: ExercisesResolver,
		exercise: ExerciseResolver
	},
	Mutation: {
		createExercise: createExerciseResolver
	}
}

export default resolvers;

