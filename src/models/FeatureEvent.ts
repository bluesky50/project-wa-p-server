import mongoose from 'mongoose';
import IFeatureEvent from '../interfaces/models/IFeatureEvent';

export interface IFeatureEventDocument extends mongoose.Document, IFeatureEvent {}

export interface IFeatureEventModel extends mongoose.Model<IFeatureEventDocument> {}

const FeatureEventSchema: mongoose.Schema = new mongoose.Schema({
	updatedAt: {
		type: String,
		required: false,
		default: '',
		maxLength: 24,
		minLength: 1
	},
	feature: {
		type: mongoose.Schema.Types.ObjectId,
		required: false,
		default: null,
		ref: '',
	},
	session: {
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

const FeatureEvent: IFeatureEventModel = mongoose.model<IFeatureEventDocument, IFeatureEventModel>('FeatureEvent', FeatureEventSchema, 'FeatureEvents');

export default FeatureEvent;

