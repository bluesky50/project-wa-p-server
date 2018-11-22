import mongoose from 'mongoose';
import IFeedback from '../interfaces/models/IFeedback';

export interface IFeedbackDocument extends mongoose.Document, IFeedback {}

export interface IFeedbackModel extends mongoose.Model<IFeedbackDocument> {}

const FeedbackSchema: mongoose.Schema = new mongoose.Schema({
	updatedAt: {
		type: String,
		required: false,
		default: 'today',
		maxLength: 24,
		minLength: 1
	},
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		required: false,
		default: null,
		ref: 'User',
	},
	title: {
		type: String,
		required: false,
		default: 'fb-dflt-title',
		maxLength: 24,
		minLength: 1
	},
	description: {
		type: String,
		required: false,
		default: 'fb-dflt-desc',
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
	votes: {
		type: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}],
		required: false,
		default: [],
	}
}, { versionKey: false });

const Feedback: IFeedbackModel = mongoose.model<IFeedbackDocument, IFeedbackModel>('Feedback', FeedbackSchema, 'Feedbacks');

export default Feedback;

