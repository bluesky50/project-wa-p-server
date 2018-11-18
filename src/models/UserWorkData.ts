import mongoose from 'mongoose';
import IUserWorkData from '../interfaces/models/IUserWorkData';

export interface IUserWorkDataDocument extends mongoose.Document, IUserWorkData {}

export interface IUserWorkDataModel extends mongoose.Model<IUserWorkDataDocument> {}

const UserWorkDataSchema: mongoose.Schema = new mongoose.Schema({
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

const UserWorkData: IUserWorkDataModel = mongoose.model<IUserWorkDataDocument, IUserWorkDataModel>('UserWorkData', UserWorkDataSchema, 'UserWorkDatas');

export default UserWorkData;

