import mongoose from 'mongoose';
import IProjectNote from '../interfaces/models/IProjectNote';

export interface IProjectNoteDocument extends mongoose.Document, IProjectNote {}

export interface IProjectNoteModel extends mongoose.Model<IProjectNoteDocument> {}

const ProjectNoteSchema: mongoose.Schema = new mongoose.Schema({
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
	projectId: {
		type: mongoose.Schema.Types.ObjectId,
		required: false,
		default: null,
		ref: 'Project',
	},
	title: {
		type: String,
		required: false,
		default: 'pn-dflt-title',
		maxLength: 24,
		minLength: 1
	},
	description: {
		type: String,
		required: false,
		default: 'pn-dflt-desc',
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

const ProjectNote: IProjectNoteModel = mongoose.model<IProjectNoteDocument, IProjectNoteModel>('ProjectNote', ProjectNoteSchema, 'ProjectNotes');

export default ProjectNote;

