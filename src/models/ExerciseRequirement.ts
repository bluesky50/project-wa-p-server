import mongoose from 'mongoose';
import IExerciseRequirement from '../interfaces/models/IExerciseRequirement';

export interface IExerciseRequirementDocument extends mongoose.Document, IExerciseRequirement {}

export interface IExerciseRequirementModel extends mongoose.Model<IExerciseRequirementDocument> {}

const ExerciseRequirementSchema: mongoose.Schema = new mongoose.Schema({
	updatedAt: {
		type: mongoose.Schema.Types.ObjectId,
		required: false,
		default: null,
		ref: '',
	},
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		required: false,
		default: null,
		ref: '',
	},
	exerciseId: {
		type: mongoose.Schema.Types.ObjectId,
		required: false,
		default: null,
		ref: '',
	},
	title: {
		type: String,
		required: false,
		default: '',
		maxLength: 24,
		minLength: 1
	},
	description: {
		type: String,
		required: false,
		default: '',
		maxLength: 24,
		minLength: 1
	},
	type: {
		type: String,
		required: false,
		default: '',
		maxLength: 24,
		minLength: 1
	},
	category: {
		type: String,
		required: false,
		default: '',
		maxLength: 24,
		minLength: 1
	},
	tags: {
		type: [{
			type: String,
			ref: ''
		}],
		required: false,
		default: [],
	}
}, { versionKey: false });

const ExerciseRequirement: IExerciseRequirementModel = mongoose.model<IExerciseRequirementDocument, IExerciseRequirementModel>('ExerciseRequirement', ExerciseRequirementSchema, 'ExerciseRequirements');

export default ExerciseRequirement;

