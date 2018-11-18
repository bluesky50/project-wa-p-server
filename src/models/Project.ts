import mongoose from 'mongoose';
import IProject from '../interfaces/models/IProject';

export interface IProjectDocument extends mongoose.Document, IProject {}

export interface IProjectModel extends mongoose.Model<IProjectDocument> {}

const ProjectSchema: mongoose.Schema = new mongoose.Schema({
	updatedAt: {
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

const Project: IProjectModel = mongoose.model<IProjectDocument, IProjectModel>('Project', ProjectSchema, 'Projects');

export default Project;

