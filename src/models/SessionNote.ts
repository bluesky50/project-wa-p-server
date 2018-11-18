import mongoose from 'mongoose';
import ISessionNote from '../interfaces/models/ISessionNote';

export interface ISessionNoteDocument extends mongoose.Document, ISessionNote {}

export interface ISessionNoteModel extends mongoose.Model<ISessionNoteDocument> {}

const SessionNoteSchema: mongoose.Schema = new mongoose.Schema({
	updatedAt: {
		type: mongoose.Schema.Types.ObjectId,
		required: false,
		default: null,
		ref: '',
	},
	sessionId: {
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

const SessionNote: ISessionNoteModel = mongoose.model<ISessionNoteDocument, ISessionNoteModel>('SessionNote', SessionNoteSchema, 'SessionNotes');

export default SessionNote;

