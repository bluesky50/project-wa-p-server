import mongoose from 'mongoose';
import IFeedback from '../interfaces/models/IFeedback';

export interface IFeedbackDocument extends mongoose.Document, IFeedback {}

export interface IFeedbackModel extends mongoose.Model<IFeedbackDocument> {}

const FeedbackSchema: mongoose.Schema = new mongoose.Schema({
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

const Feedback: IFeedbackModel = mongoose.model<IFeedbackDocument, IFeedbackModel>('Feedback', FeedbackSchema, 'Feedbacks');

export default Feedback;

