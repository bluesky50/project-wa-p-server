import mongoose from 'mongoose';
import IExercise from '../interfaces/models/IExercise';

export interface IExerciseDocument extends mongoose.Document, IExercise {}

export interface IExerciseModel extends mongoose.Model<IExerciseDocument> {}

const ExerciseSchema: mongoose.Schema = new mongoose.Schema({
	updatedAt: {
		type: String,
		required: false,
		default: '',
		maxLength: 24,
		minLength: 1
	},
	creator: {
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
	},
	requirements: {
		type: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: ''
		}],
		required: false,
		default: [],
	}
}, { versionKey: false });

const Exercise: IExerciseModel = mongoose.model<IExerciseDocument, IExerciseModel>('Exercise', ExerciseSchema, 'Exercises');

export default Exercise;

